import {Injectable, Logger} from "@nestjs/common";
import {IRefreshTokenParams, IRefreshTokenResponse} from "./refresh-token.interface";
import {usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";
import {Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RefreshTokenUsecase {
    private readonly logger = new Logger(RefreshTokenUsecase.name);

    constructor(
        @InjectRepository(RefreshTokensEntity)
        private readonly refreshTokensRepository: Repository<RefreshTokensEntity>,
        private readonly jwtService: JwtService,
    ) {}

    public async handler(params: IRefreshTokenParams): Promise<IRefreshTokenResponse> {
        try {
            const existRefreshToken = await this.refreshTokensRepository.findOneBy({
                userId: params.userId,
                token: params.token
            });

            if (!existRefreshToken) {
                throw new RpcException({
                    status: 404,
                    message: 'Refresh token is not found'
                })
            }

            const [newRefreshToken, newAccessToken] = await Promise.all([
                this.jwtService.signAsync({userId: params.userId}, {expiresIn: '60d'}),
                this.jwtService.signAsync({userId: params.userId}, {expiresIn: '30m'}),
            ]);

            await this.refreshTokensRepository.update({id: existRefreshToken.id}, {token: newRefreshToken});

            return {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
            }
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка при обновлении токена');
        }
    }
}