import {Injectable, Logger} from "@nestjs/common";
import {resolveObservable, usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {DataSource, Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {
    IDecrementBalanceParams,
    IDecrementBalanceResponse,
    IIncrementBalanceParams,
    IIncrementBalanceResponse
} from "./change-balance.interface";

@Injectable()
export class ChangeBalanceUsecase {
    private readonly logger = new Logger(ChangeBalanceUsecase.name);

    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletEntityRepository: Repository<WalletEntity>,
        private dataSource: DataSource,
    ) {}

    public async incrementHandler(params: IIncrementBalanceParams): Promise<IIncrementBalanceResponse> {
        try {
            const _wallet = await this.walletEntityRepository.findOneBy({
                userId: params.userId
            });

            if (!_wallet) {
                throw new RpcException({
                    status: 404,
                    message: 'Wallet is not exist'
                })
            }

            const correctAmount = params.amount * 100;

            await this.walletEntityRepository.increment({id: _wallet.id}, 'balance', correctAmount);

            return {
                balance: _wallet.balance + correctAmount,
            };
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка инкремента баланса');
        }
    }


    public async decrementHandler(params: IDecrementBalanceParams): Promise<IDecrementBalanceResponse> {
        try {
            const _wallet = await this.walletEntityRepository.findOneBy({
                userId: params.userId
            });

            if (!_wallet) {
                throw new RpcException({
                    status: 404,
                    message: 'Wallet is not exist'
                })
            }

            const correctAmount = params.amount * 100;

            const queryRunner = this.dataSource.createQueryRunner();

            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const wallet = await queryRunner.manager.findOne(WalletEntity, {where: {userId: params.userId}, lock: {mode: 'pessimistic_write'}})

                if (wallet!.balance < correctAmount) {
                    throw new RpcException({
                        status: 400,
                        message: 'Low balance'
                    })
                }

                await queryRunner.manager.decrement(WalletEntity, {id: _wallet.id}, 'balance', correctAmount);

                await queryRunner.commitTransaction();
            } catch (err) {
                await queryRunner.rollbackTransaction();
                throw err;
            } finally {
                await queryRunner.release();
            }

            return {
                balance: _wallet.balance - correctAmount,
            };
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка декремента баланса');
        }
    }
}