import {Module} from '@nestjs/common';
import {ChangeBalanceUsecase} from "./change-balance.usecase";
import {ChangeBalanceController} from "./change-balance.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {ConfigurationModule} from "../../modules/config/config.module";
import {TransportModule} from "../../modules/transport/transport.module";

@Module({
    imports: [TransportModule, ConfigurationModule, TypeOrmModule.forFeature([WalletEntity])],
    controllers: [ChangeBalanceController],
    providers: [ChangeBalanceUsecase],
})
export class ChangeBalanceModule {
}
