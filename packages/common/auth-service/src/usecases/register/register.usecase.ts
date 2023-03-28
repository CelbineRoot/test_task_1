import {Injectable, Logger} from "@nestjs/common";
import {resolveObservable, usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";
import {Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";
import {UsersPublisher} from 'common/users-service/src/users.publisher';
import {IRegisterParams} from "./register.interface";
import {firstValueFrom} from "rxjs";
import {WalletPublisher} from 'common/wallet-service/src/wallet.publisher';

@Injectable()
export class RegisterUsecase {
    private readonly logger = new Logger(RegisterUsecase.name);

    constructor(
        @InjectRepository(RefreshTokensEntity)
        private readonly refreshTokensRepository: Repository<RefreshTokensEntity>,
        private readonly jwtService: JwtService,
        private readonly usersPublisher: UsersPublisher,
        private readonly walletPublisher: WalletPublisher,
    ) {}

    public async handler(params: IRegisterParams) {
        try {
            const existUser = await firstValueFrom(this.usersPublisher.getUser({email: params.email}));

            if (existUser) {
                throw new RpcException({
                    status: 404,
                    message: 'This user already exists'
                })
            }

            const newUser = await firstValueFrom(this.usersPublisher.createUser({email: params.email, password: params.password}))

            const newWallet = await firstValueFrom(this.walletPublisher.createWallet({userId: newUser.id}));

            const [newRefreshToken, newAccessToken] = await Promise.all([
                this.jwtService.signAsync({userId: newUser.id}, {expiresIn: '60d'}),
                this.jwtService.signAsync({userId: newUser.id}, {expiresIn: '30m'}),
            ]);

            await this.refreshTokensRepository.insert({token: newRefreshToken, userId: newUser.id});

            return {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
                user: newUser,
            }
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка при регистрации');
        }
    }
}