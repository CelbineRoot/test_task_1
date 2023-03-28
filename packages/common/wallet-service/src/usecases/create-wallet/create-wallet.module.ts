import {Module} from '@nestjs/common';
import {CreateWalletUsecase} from "./create-wallet.usecase";
import {CreateWalletController} from "./create-wallet.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {ConfigurationModule} from "../../modules/config/config.module";
import {TransportModule} from "../../modules/transport/transport.module";

@Module({
    imports: [TransportModule, ConfigurationModule, TypeOrmModule.forFeature([WalletEntity])],
    controllers: [CreateWalletController],
    providers: [CreateWalletUsecase],
})
export class CreateWalletModule {
}
