import {Module} from '@nestjs/common';
import {RefreshTokenUsecase} from "./refresh-token.usecase";
import {RefreshTokenController} from "./refresh-token.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";
import {ConfigurationModule} from "../../modules/config/config.module";

@Module({
    imports: [ConfigurationModule, TypeOrmModule.forFeature([RefreshTokensEntity])],
    controllers: [RefreshTokenController],
    providers: [RefreshTokenUsecase],
})
export class RefreshTokenModule {
}
