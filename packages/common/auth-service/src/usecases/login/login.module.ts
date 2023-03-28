import {Module} from '@nestjs/common';
import {LoginUsecase} from "./login.usecase";
import {LoginController} from "./login.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";
import {ConfigurationModule} from "../../modules/config/config.module";
import {TransportModule} from "../../modules/transport/transport.module";
import {UsersPublisher} from 'common/users-service/src/users.publisher';
import {transportService} from "../../modules/transport";
import {ClientNats} from "@nestjs/microservices";

@Module({
    imports: [TransportModule, ConfigurationModule, TypeOrmModule.forFeature([RefreshTokensEntity])],
    controllers: [LoginController],
    providers: [
        LoginUsecase,
        {
            provide: UsersPublisher,
            useFactory: (transport: ClientNats) => {
                return new UsersPublisher(transport);
            },
            inject: [{token: transportService, optional: false}],
        },
    ],
})
export class LoginModule {
}
