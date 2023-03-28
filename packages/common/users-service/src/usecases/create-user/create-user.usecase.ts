import {Injectable, Logger} from "@nestjs/common";
import {usecaseErrorHandler} from "@test-task/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {ICreateUserParams} from "./create-user.interface";
import {UsersEntity} from "../../entities/users.entity";
import {hash} from "bcrypt";

@Injectable()
export class CreateUserUsecase {
    private readonly logger = new Logger(CreateUserUsecase.name);

    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) {}

    public async handler(params: ICreateUserParams) {
        try {
            const existUser = await this.userRepository.findOneBy({
                email: params.email
            });

            if (existUser) {
                throw new RpcException({
                    status: 400,
                    message: 'This user already exists'
                })
            }

            const insertResult = await this.userRepository.insert({
                password: await hash(params.password, 6),
                email: params.email
            });

            return insertResult.generatedMaps[0]
        } catch (error) {
            this.logger.error(error);
            usecaseErrorHandler(error, 'Ошибка при создании пользователя');
        }
    }
}