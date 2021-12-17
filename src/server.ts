// deps
import {NestFactory} from '@nestjs/core';
import {moduleFactory} from '@modules/app.module';
import dotenv = require('dotenv');

dotenv.config();

async function bootstrap(): Promise<void> {
  const nestApp = await NestFactory.create(
    moduleFactory({
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
    }),
  );

  nestApp.enableCors();

  await nestApp.listen(process.env.APP_PORT);
  console.info('attempt to running service');

  console.info(`Server started at http://localhost:${process.env.APP_PORT}`);
}

bootstrap();
