import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {VerifyTokenUsecase} from "./verify-token.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {IVerifyTokenParams, pattern} from "./verify-token.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class VerifyTokenController {
    constructor(private readonly verifyTokenUsecase: VerifyTokenUsecase) {}

    @MessagePattern(pattern)
    async getUser(@Payload() payload: IVerifyTokenParams) {
        return this.verifyTokenUsecase.handler(payload);
    }
}
