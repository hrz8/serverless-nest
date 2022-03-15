// deps
import { Server } from 'http';
import express = require('express');
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { createServer, proxy } from 'aws-serverless-express';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import dotenv = require('dotenv');

// app
import { AppModuleFactory } from '@modules/app.module';
import { IDBConfig } from '@/types/dbconfig.interface';
import { IRedisConfig } from '@/types/redisconfig.interface';

dotenv.config();

const binaryMimeTypes: string[] = [];

let cachedServers: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

const ExpressServerFactory = async (
  dbConfig: IDBConfig,
  redisConfig: IRedisConfig
): Promise<Server> => {
  try {
    console.info('attempt to running service');
    const expressApp = express();
  
    const adapter = new ExpressAdapter(expressApp);
  
    const AppModule = AppModuleFactory(dbConfig, redisConfig)

    const server = await NestFactory.create(
      AppModule,
      adapter,
    )
    .then((app) => app.init())
    .then(() => createServer(expressApp, undefined, binaryMimeTypes));
  
    return server;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!cachedServers) {
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

    const expressServer = await ExpressServerFactory(dbConfig, redisConfig);

    cachedServers = expressServer;
  }

  return proxy(cachedServers, event, context, 'PROMISE').promise;
}
