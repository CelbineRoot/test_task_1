import {Injectable, Logger} from "@nestjs/common";
import {resolveObservable, usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {ICreateWalletParams} from "./create-wallet.interface";

@Injectable()
export class CreateWalletUsecase {
    private readonly logger = new Logger(CreateWalletUsecase.name);

    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletEntityRepository: Repository<WalletEntity>,
    ) {}

    public async handler(params: ICreateWalletParams) {
        try {
            const existWallet = await this.walletEntityRepository.findOneBy({
                userId: params.userId
            });

            if (existWallet) {
                throw new RpcException({
                    status: 404,
                    message: 'Wallet is already exist'
                })
            }

            const newWallet = await this.walletEntityRepository.insert({
                userId: params.userId,
                balance: 0
            })

            return newWallet.generatedMaps[0];
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка баланса');
        }
    }
}