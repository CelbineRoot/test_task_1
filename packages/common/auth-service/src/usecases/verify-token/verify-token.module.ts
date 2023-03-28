import { Module } from '@nestjs/common';
import {VerifyTokenController} from "./verify-token.controller";
import {VerifyTokenUsecase} from "./verify-token.usecase";

@Module({
  controllers: [VerifyTokenController],
  providers: [VerifyTokenUsecase],
})
export class VerifyTokenModule {}
