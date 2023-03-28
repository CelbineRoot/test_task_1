import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export const natsConfig = registerAs('nats', () => ({
    host: get('NATS_HOST').required().asString(),
    port: get('NATS_PORT').required().asPortNumber(),
}));

export const appConfig = registerAs('app', () => ({
    environment: get('NODE_ENV').required().asString(),
    postgres_port: get('USERS_POSTGRES_PORT').required().asPortNumber(),
    postgres_host: get('USERS_POSTGRES_PORT').required().asString(),
    postgres_database: get('USERS_POSTGRES_DATABASE').required().asString(),
    postgres_username: get('USERS_POSTGRES_USERNAME').required().asString(),
    postgres_password: get('USERS_POSTGRES_PASSWORD').required().asString(),
}));