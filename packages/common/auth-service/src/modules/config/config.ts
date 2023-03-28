import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export const natsConfig = registerAs('nats', () => ({
    host: get('NATS_HOST').required().asString(),
    port: get('NATS_PORT').required().asPortNumber(),
}));

export const appConfig = registerAs('app', () => ({
    environment: get('NODE_ENV').required().asString(),
    jwt_secret: get('JWT_SECRET').required().asString(),
    postgres_port: get('AUTH_POSTGRES_PORT').required().asPortNumber(),
    postgres_host: get('AUTH_POSTGRES_PORT').required().asString(),
    postgres_database: get('AUTH_POSTGRES_DATABASE').required().asString(),
    postgres_username: get('AUTH_POSTGRES_USERNAME').required().asString(),
    postgres_password: get('AUTH_POSTGRES_PASSWORD').required().asString(),
}));