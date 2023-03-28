import {Controller, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RpcValidationFilter} from "@test-task/common";
import {CreateWalletUsecase} from "./create-wallet.usecase";
import {MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {ICreateWalletParams, pattern} from "./create-wallet.interface";

@UseFilters(new RpcValidationFilter())
@UsePipes(new ValidationPipe())
@Controller()
export class CreateWalletController {
    constructor(private readonly createWalletUsecase: CreateWalletUsecase) {}

    @MessagePattern(pattern)
    async createWallet(@Payload() payload: ICreateWalletParams) {
        return this.createWalletUsecase.handler(payload);
    }
}
