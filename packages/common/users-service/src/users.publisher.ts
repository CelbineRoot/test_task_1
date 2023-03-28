import {ClientNats} from "@nestjs/microservices";
import {Injectable} from "@nestjs/common";
import {IGetUserParams, pattern as getUserPattern} from "./usecases/get-user/get-user.interface";
import {UsersEntity} from "./entities/users.entity";
import {ICreateUserParams, pattern as createUserPattern} from "./usecases/create-user/create-user.interface";

@Injectable()
export class UsersPublisher {
    constructor(private readonly transport: ClientNats) {}

    getUser(params: IGetUserParams) {
        return this.transport.send<UsersEntity>(getUserPattern, params);
    }

    createUser(params: ICreateUserParams) {
        return this.transport.send<UsersEntity>(createUserPattern, params);
    }
}