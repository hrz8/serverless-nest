// deps
import { Server } from 'http';
import express = require('express');
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { createServer, proxy } from 'aws-serverless-express';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

// app
import { moduleFactory } from '@modules/app.module';
import { IDBConfig } from '@/types/dbconfig.interface';

const binaryMimeTypes: string[] = [];

let cachedServers: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

const serverFactory = async ({ host, port, username, password }: IDBConfig): Promise<Server> => {
  try {
    console.info('attempt to running service');
    const expressApp = express();
  
    const adapter = new ExpressAdapter(expressApp);
  
    const server = await NestFactory.create(
      moduleFactory({
        host,
        password,
        username,
        port,
      }),
      adapter,
    ).then(() => createServer(expressApp, undefined, binaryMimeTypes));
  
    return server;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  if (!cachedServers) {
    const server = await serverFactory({
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD
    });

    cachedServers = server;
  }

  return proxy(cachedServers, event, context, 'PROMISE').promise;
}
