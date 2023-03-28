import {Injectable, Logger} from "@nestjs/common";
import {resolveObservable, usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {Repository} from "typeorm";
import {IGetBalanceParams} from "./get-balance.interface";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class GetBalanceUsecase {
    private readonly logger = new Logger(GetBalanceUsecase.name);

    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletEntityRepository: Repository<WalletEntity>,
    ) {}

    public async handler(params: IGetBalanceParams) {
        try {
            const wallet = await this.walletEntityRepository.findOneBy({
                userId: params.userId
            });

            if (!wallet) {
                throw new RpcException({
                    status: 404,
                    message: 'Wallet is not exist'
                })
            }

            return {
                balance: wallet.balance / 100,
            }
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка баланса');
        }
    }
}