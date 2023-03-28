import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../../entities/users.entity";
import {GetUserController} from "./get-user.controller";
import {GetUserUsecase} from "./get-user.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [GetUserController],
  providers: [GetUserUsecase],
})
export class GetUserModule {}
