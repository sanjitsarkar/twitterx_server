import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URL || 'mongodb://localhost:27017/myapp',
  JWT_SECRET: process.env.JWT_SECRET,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_SSL_CA: process.env.POSTGRES_SSL_CA
}
