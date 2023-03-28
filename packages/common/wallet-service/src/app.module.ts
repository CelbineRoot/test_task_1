import {Module} from '@nestjs/common';
import { createTypeormModule } from './create-typeorm.module';
import {ConfigurationModule} from "./modules/config/config.module";
import {TransportModule} from "./modules/transport/transport.module";
import {GetBalanceModule} from "./usecases/get-balance/get-balance.module";
import {ChangeBalanceModule} from "./usecases/change-balance/change-balance.module";
import {CreateWalletModule} from "./usecases/create-wallet/create-wallet.module";

@Module({
  imports: [
      ConfigurationModule,
      TransportModule,
      createTypeormModule(),
      GetBalanceModule,
      ChangeBalanceModule,
      CreateWalletModule
  ],
})
export class AppModule {}
