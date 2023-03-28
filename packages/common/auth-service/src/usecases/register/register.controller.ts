import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {RegisterUsecase} from "./register.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {IRegisterParams, pattern} from "./register.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class RegisterController {
    constructor(private readonly registerUsecase: RegisterUsecase) {}

    @MessagePattern(pattern)
    async register(@Payload() payload: IRegisterParams) {
        if(!payload.email || !payload.password) {
            throw new RpcException({
                status: 400,
                message: 'Must specify all parameters'
            })
        }

        return this.registerUsecase.handler(payload);
    }
}
