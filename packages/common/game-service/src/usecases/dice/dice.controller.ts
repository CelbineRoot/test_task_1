import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {DiceUsecase} from "./dice.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {IDiceParams, pattern} from "./dice.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class DiceController {
    constructor(private readonly createUserUsecase: DiceUsecase) {}

    @MessagePattern(pattern)
    async dice(@Payload() payload: IDiceParams) {
        return this.createUserUsecase.handler(payload);
    }
}
