import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {GetUserUsecase} from "./get-user.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {IGetUserParams, pattern} from "./get-user.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class GetUserController {
    constructor(private readonly getUserUsecase: GetUserUsecase) {}

    @MessagePattern(pattern)
    async getUser(@Payload() payload: IGetUserParams) {
        if(!payload.email && !payload.id) {
            throw new RpcException({
                status: 400,
                message: 'Must specify at least 1 parameter'
            })
        }

        return this.getUserUsecase.handler(payload);
    }
}
