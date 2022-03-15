// deps
import {NestFactory} from '@nestjs/core';
import dotenv = require('dotenv');

import {AppModuleFactory} from '@modules/app.module';
import { IDBConfig } from '@/types/dbconfig.interface';
import { IRedisConfig } from '@/types/redisconfig.interface';

dotenv.config();

async function bootstrap(): Promise<void> {
  const dbConfig: IDBConfig = {
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
  };

  const redisConfig: IRedisConfig = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    ttl: Number(process.env.REDIS_TTL),
  };

  const AppModule = AppModuleFactory(dbConfig, redisConfig);

  const nestApp = await NestFactory.create(AppModule);

  nestApp.enableCors();

  await nestApp.listen(process.env.APP_PORT);
  console.info('attempt to running service');

  console.info(`Server started at http://localhost:${process.env.APP_PORT}`);
}

bootstrap();
