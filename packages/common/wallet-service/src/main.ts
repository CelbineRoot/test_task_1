import {ConfigType} from "@nestjs/config";
import {appConfig, natsConfig} from "./modules/config/config";
import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";
import {Logger} from "@nestjs/common";

const logger = new Logger('bootrstap');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configNats = app.get<ConfigType<typeof natsConfig>>(natsConfig.KEY);
    const configApp = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    app.useLogger(
        configApp.environment === 'production'
            ? ['error', 'warn']
            : ['log', 'debug', 'error', 'verbose', 'warn'],
    );
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.NATS,
        options: { servers: [`nats://${configNats.host}:${configNats.port}`] },
    });
    await app.startAllMicroservices();
    await app.init();
    logger.log('Microservice is listening');
}
bootstrap();