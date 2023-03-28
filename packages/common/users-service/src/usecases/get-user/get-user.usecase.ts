import {Injectable, Logger} from "@nestjs/common";
import {usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {UsersEntity} from "../../entities/users.entity";
import {IGetUserParams} from "./get-user.interface";

@Injectable()
export class GetUserUsecase {
    private readonly logger = new Logger(GetUserUsecase.name);

    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) {}

    public async handler(params: IGetUserParams) {
        try {
            const whereParams = params.id ? {id: params.id} : {email: params.email};

            const existUser = await this.userRepository.findOneBy(whereParams);

            if (!existUser) {
                throw new RpcException({
                    status: 404,
                    message: 'User is not found'
                })
            }

            return existUser;
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка при создании пользователя');
        }
    }
}