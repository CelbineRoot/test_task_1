import {ClientNats} from "@nestjs/microservices";
import {Injectable} from "@nestjs/common";
import {ICreateWalletParams, pattern as createWalletPattern} from "./usecases/create-wallet/create-wallet.interface";
import {
    decrementPattern,
    IDecrementBalanceParams,
    IDecrementBalanceResponse,
    IIncrementBalanceParams, IIncrementBalanceResponse, incrementPattern
} from "./usecases/change-balance/change-balance.interface";
import {WalletEntity} from "./entities/wallet.entity";
import {IGetBalanceResponse, pattern as getBalancePattern} from "./usecases/get-balance/get-balance.interface";

@Injectable()
export class WalletPublisher {
    constructor(private readonly transport: ClientNats) {}

    createWallet(params: ICreateWalletParams) {
        return this.transport.send<WalletEntity>(createWalletPattern, params);
    }

    incrementBalance(params: IIncrementBalanceParams) {
        return this.transport.send<IIncrementBalanceResponse>(incrementPattern, params);
    }

    decrementBalance(params: IDecrementBalanceParams) {
        return this.transport.send<IDecrementBalanceResponse>(decrementPattern, params);
    }

    getBalance(params: ICreateWalletParams) {
        return this.transport.send<IGetBalanceResponse>(getBalancePattern, params);
    }
}