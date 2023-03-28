import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { transportService } from '.';
import { natsConfig } from '../config/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [natsConfig.KEY],
        useFactory: async (config: ConfigType<typeof natsConfig>) => ({
          transport: Transport.NATS,
          options: {
            name: transportService,
            servers: [`nats://${config.host}:${config.port}`],
          },
        }),
        name: transportService,
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TransportModule {}
