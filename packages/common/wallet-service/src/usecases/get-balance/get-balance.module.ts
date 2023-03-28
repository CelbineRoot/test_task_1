import {Module} from '@nestjs/common';
import {GetBalanceUsecase} from "./get-balance.usecase";
import {GetBalanceController} from "./get-balance.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {ConfigurationModule} from "../../modules/config/config.module";
import {TransportModule} from "../../modules/transport/transport.module";

@Module({
    imports: [TransportModule, ConfigurationModule, TypeOrmModule.forFeature([WalletEntity])],
    controllers: [GetBalanceController],
    providers: [GetBalanceUsecase],
})
export class GetBalanceModule {
}
