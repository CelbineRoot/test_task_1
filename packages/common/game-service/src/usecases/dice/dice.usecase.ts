import {Injectable, Logger} from "@nestjs/common";
import {usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DiceEntity} from "../../entities/dice.entity";
import {IDiceParams} from "./dice.interface";
import {firstValueFrom} from "rxjs";
import {WalletPublisher} from 'common/wallet-service/src/wallet.publisher';
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class DiceUsecase {
    private readonly logger = new Logger(DiceUsecase.name);

    constructor(
        @InjectRepository(DiceEntity)
        private readonly diceEntityRepository: Repository<DiceEntity>,
        private readonly walletPublisher: WalletPublisher,
    ) {}

    public async handler(params: IDiceParams) {
        try {
            const {balance} = await firstValueFrom(this.walletPublisher.getBalance({userId: params.userId}));

            if (balance < params.amount * 100) {
                throw new RpcException({
                    status: 400,
                    message: 'Low balance'
                })
            }

            await firstValueFrom(this.walletPublisher.decrementBalance({amount: params.amount, userId: params.userId}));

            const win = 0.5 > Math.random();

            if (win) {
                await firstValueFrom(this.walletPublisher.incrementBalance({amount: params.amount * 2, userId: params.userId}));
            }

            await this.diceEntityRepository.insert({
                win,
                amount: params.amount,
                userId: params.userId
            });

            return {
                win
            }
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка игры dice');
        }
    }
}