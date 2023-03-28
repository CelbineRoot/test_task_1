import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {CreateUserUsecase} from "./create-user.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {ICreateUserParams, pattern} from "./create-user.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class CreateUserController {
    constructor(private readonly createUserUsecase: CreateUserUsecase) {}

    @MessagePattern(pattern)
    async createUser(@Payload() payload: ICreateUserParams) {
        if(!payload.email || !payload.password) {
            throw new RpcException({
                status: 400,
                message: 'Must specify all parameters'
            })
        }

        return this.createUserUsecase.handler(payload);
    }
}
