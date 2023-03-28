import {Injectable, Logger} from "@nestjs/common";
import {resolveObservable, usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";
import {Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";
import {UsersPublisher} from 'common/users-service/src/users.publisher';
import {firstValueFrom} from "rxjs";
import {ILoginParams} from "./login.interface";

@Injectable()
export class LoginUsecase {
    private readonly logger = new Logger(LoginUsecase.name);

    constructor(
        @InjectRepository(RefreshTokensEntity)
        private readonly refreshTokensRepository: Repository<RefreshTokensEntity>,
        private readonly jwtService: JwtService,
        private readonly usersPublisher: UsersPublisher,
    ) {}

    public async handler(params: ILoginParams) {
        try {
            const existUser = await firstValueFrom(this.usersPublisher.getUser({email: params.email}));

            if (!existUser) {
                throw new RpcException({
                    status: 404,
                    message: 'This user is not exists'
                })
            }

            const refreshToken = await this.refreshTokensRepository.findOneBy({
                userId: existUser.id,
            });

            const [newRefreshToken, newAccessToken] = await Promise.all([
                this.jwtService.signAsync({userId: existUser.id}, {expiresIn: '60d'}),
                this.jwtService.signAsync({userId: existUser.id}, {expiresIn: '30m'}),
            ]);

            await this.refreshTokensRepository.update({id: refreshToken?.id}, {token: newRefreshToken, userId: existUser.id});

            return {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
                user: existUser,
            }
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка при авторизации');
        }
    }
}