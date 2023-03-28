import {Module} from '@nestjs/common';
import { createTypeormModule } from './create-typeorm.module';
import {ConfigurationModule} from "./modules/config/config.module";
import {createJwtModule} from "./jwt.module";
import {VerifyTokenModule} from "./usecases/verify-token/verify-token.module";
import {RefreshTokenModule} from "./usecases/refresh-token/refresh-token.module";
import {TransportModule} from "./modules/transport/transport.module";
import {LoginModule} from "./usecases/login/login.module";
import {RegisterModule} from "./usecases/register/register.module";

@Module({
  imports: [
      ConfigurationModule,
      TransportModule,
      createTypeormModule(),
      createJwtModule(),
      VerifyTokenModule,
      RefreshTokenModule,
      LoginModule,
      RegisterModule
  ],
})
export class AppModule {}
