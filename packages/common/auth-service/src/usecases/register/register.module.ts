import {Module} from '@nestjs/common';
import {RegisterUsecase} from "./register.usecase";
import {RegisterController} from "./register.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";
import {ConfigurationModule} from "../../modules/config/config.module";
import {TransportModule} from "../../modules/transport/transport.module";
import {UsersPublisher} from 'common/users-service/src/users.publisher';
import {WalletPublisher} from 'common/wallet-service/src/wallet.publisher';
import {transportService} from "../../modules/transport";
import {ClientNats} from "@nestjs/microservices";

@Module({
    imports: [TransportModule, ConfigurationModule, TypeOrmModule.forFeature([RefreshTokensEntity])],
    controllers: [RegisterController],
    providers: [
        RegisterUsecase,
        {
            provide: UsersPublisher,
            useFactory: (transport: ClientNats) => {
                return new UsersPublisher(transport);
            },
            inject: [{token: transportService, optional: false}],
        },
        {
            provide: WalletPublisher,
            useFactory: (transport: ClientNats) => {
                return new WalletPublisher(transport);
            },
            inject: [{token: transportService, optional: false}],
        },
    ],
})
export class RegisterModule {
}
