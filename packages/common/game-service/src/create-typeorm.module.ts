import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigurationModule} from "./modules/config/config.module";
import {ConfigType} from "@nestjs/config";
import {appConfig} from "./modules/config/config";

export const createTypeormModule = () => TypeOrmModule.forRootAsync({
  imports: [ConfigurationModule],
  useFactory: async (config: ConfigType<typeof appConfig>,) => {
    return {
      type: 'postgres',
      synchronize: false,

      database: config.postgres_database,
      host: config.postgres_host,
      port: config.postgres_port,
      username: config.postgres_username,
      password: config.postgres_password,

      autoLoadEntities: true,
    };
  },
  inject: [appConfig.KEY],
});