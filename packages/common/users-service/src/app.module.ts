import {Module} from "@nestjs/common";
import {createTypeormModule} from "./create-typeorm.module";
import {ConfigurationModule} from "./modules/config/config.module";
import {CreateUserModule} from "./usecases/create-user/create-user.module";
import {GetUserModule} from "./usecases/get-user/get-user.module";

@Module({
    imports: [
        createTypeormModule(),
        ConfigurationModule,
        CreateUserModule,
        GetUserModule
    ],
})
export class AppModule {}