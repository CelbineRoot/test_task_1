import {ClientNats} from "@nestjs/microservices";
import {Injectable} from "@nestjs/common";
import {IRefreshTokenParams, IRefreshTokenResponse, pattern as refreshPattern} from "./usecases/refresh-token/refresh-token.interface";
import {IVerifyTokenParams, pattern as verifyPattern} from "./usecases/verify-token/verify-token.interface";
import {ILoginParams, pattern as loginPattern} from "./usecases/login/login.interface";
import {IRegisterParams, pattern as registerPattern} from "./usecases/register/register.interface";

@Injectable()
export class AuthPublisher {
    constructor(private readonly transport: ClientNats) {}

    register(params: IRegisterParams) {
        return this.transport.send(registerPattern, params);
    }

    login(params: ILoginParams) {
        return this.transport.send(loginPattern, params);
    }

    verifyToken(params: IVerifyTokenParams) {
        return this.transport.send<boolean>(verifyPattern, params);
    }

    refreshToken(params: IRefreshTokenParams) {
        return this.transport.send<IRefreshTokenResponse>(refreshPattern, params);
    }
}