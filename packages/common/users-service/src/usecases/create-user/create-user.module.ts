import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../../entities/users.entity";
import {CreateUserUsecase} from "./create-user.usecase";
import {CreateUserController} from "./create-user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [CreateUserController],
  providers: [CreateUserUsecase],
})
export class CreateUserModule {}
