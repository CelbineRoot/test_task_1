import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {GetBalanceUsecase} from "./get-balance.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {IGetBalanceParams, pattern} from "./get-balance.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class GetBalanceController {
    constructor(private readonly getBalanceUsecase: GetBalanceUsecase) {}

    @MessagePattern(pattern)
    async login(@Payload() payload: IGetBalanceParams) {
        return this.getBalanceUsecase.handler(payload);
    }
}
