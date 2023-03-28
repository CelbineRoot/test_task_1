import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {LoginUsecase} from "./login.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {ILoginParams, pattern} from "./login.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class LoginController {
    constructor(private readonly loginUsecase: LoginUsecase) {}

    @MessagePattern(pattern)
    async login(@Payload() payload: ILoginParams) {
        if(!payload.email || !payload.password) {
            throw new RpcException({
                status: 400,
                message: 'Must specify all parameters'
            })
        }

        return this.loginUsecase.handler(payload);
    }
}
