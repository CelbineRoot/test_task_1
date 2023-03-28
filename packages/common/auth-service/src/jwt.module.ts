import { JwtModule } from '@nestjs/jwt';
import {ConfigurationModule} from "./modules/config/config.module";
import {ConfigType} from "@nestjs/config";
import {appConfig} from "./modules/config/config";

export const createJwtModule = () => JwtModule.registerAsync({
  imports: [ConfigurationModule],
  useFactory: async (config: ConfigType<typeof appConfig>,) => {
    return {
      secret: config.jwt_secret,
    };
  },
  inject: [appConfig.KEY],
});