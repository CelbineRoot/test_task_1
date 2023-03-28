import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {ChangeBalanceUsecase} from "./change-balance.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {
    decrementPattern,
    IDecrementBalanceParams,
    IIncrementBalanceParams,
    incrementPattern
} from "./change-balance.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class ChangeBalanceController {
    constructor(private readonly changeBalanceUsecase: ChangeBalanceUsecase) {}

    @MessagePattern(incrementPattern)
    async increment(@Payload() payload: IIncrementBalanceParams) {
        return this.changeBalanceUsecase.incrementHandler(payload);
    }

    @MessagePattern(decrementPattern)
    async decrement(@Payload() payload: IDecrementBalanceParams) {
        return this.changeBalanceUsecase.decrementHandler(payload);
    }
}
