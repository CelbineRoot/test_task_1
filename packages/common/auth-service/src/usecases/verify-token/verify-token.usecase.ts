import {Injectable, Logger} from "@nestjs/common";
import {usecaseErrorHandler} from "@test-task/common";
import {JwtService} from "@nestjs/jwt";
import {IVerifyTokenParams} from "./verify-token.interface";

@Injectable()
export class VerifyTokenUsecase {
    private readonly logger = new Logger(VerifyTokenUsecase.name);

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public async handler(params: IVerifyTokenParams): Promise<boolean> {
        try {
            const validToken = await this.jwtService.verifyAsync(params.token);

            if(!validToken) {
                return false;
            }

            return true;
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка при верификации токена');
        }
    }
}