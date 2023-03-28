import {Module} from "@nestjs/common";
import {createTypeormModule} from "./create-typeorm.module";
import {ConfigurationModule} from "./modules/config/config.module";
import {DiceModule} from "./usecases/dice/dice.module";

@Module({
    imports: [
        createTypeormModule(),
        ConfigurationModule,
        DiceModule,
    ],
})
export class AppModule {}