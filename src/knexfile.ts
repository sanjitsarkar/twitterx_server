import { ENV } from "./config/env.cofig";

export default {
  development: {
    client: 'pg',
    connection: {
      host: ENV.POSTGRES_HOST,
      user: ENV.POSTGRES_USER,
      port: ENV.POSTGRES_PORT,
      password: ENV.POSTGRES_PASSWORD,
      database: ENV.POSTGRES_DB,
      ssl: {
        rejectUnauthorized: true,
        ca: ENV.POSTGRES_SSL_CA
      }
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
