import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {RefreshTokenUsecase} from "./refresh-token.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {IRefreshTokenParams, IRefreshTokenResponse, pattern} from "./refresh-token.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class RefreshTokenController {
    constructor(private readonly refreshTokenUsecase: RefreshTokenUsecase) {}

    @MessagePattern(pattern)
    async getUser(@Payload() payload: IRefreshTokenParams): Promise<IRefreshTokenResponse> {
        if(!payload.userId || !payload.token) {
            throw new RpcException({
                status: 400,
                message: 'Must specify all parameters'
            })
        }

        return this.refreshTokenUsecase.handler(payload);
    }
}
