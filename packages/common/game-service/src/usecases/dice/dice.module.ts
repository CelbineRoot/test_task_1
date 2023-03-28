import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiceEntity} from "../../entities/dice.entity";
import {DiceUsecase} from "./dice.usecase";
import {DiceController} from "./dice.controller";
import {ClientNats} from "@nestjs/microservices";
import {transportService} from "../../modules/transport";
import {WalletPublisher} from 'common/wallet-service/src/wallet.publisher';

@Module({
  imports: [TypeOrmModule.forFeature([DiceEntity])],
  controllers: [DiceController],
  providers: [DiceUsecase,
    {
      provide: WalletPublisher,
      useFactory: (transport: ClientNats) => {
        return new WalletPublisher(transport);
      },
      inject: [{token: transportService, optional: false}],
    },],
})
export class DiceModule {}
