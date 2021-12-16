// deps
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// app
import { IDBConfig } from '@/types/dbconfig.interface';

// internal
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import User from './users/entities/users.entity';
import Todo from './todos/entities/todos.entity';
import TodoItem from './todos/entities/todoItems.entity';

interface IAppModule {}

export function moduleFactory({ host, port, username, password }: IDBConfig): IAppModule {
  const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database: process.env.TYPEORM_DATABASE,
    entities: [
      User,
      Todo,
      TodoItem
    ],
    logging: Boolean(process.env.TYPEORM_LOGGING),
    synchronize: false,
    migrationsTableName: 'migrations',
    migrations: ['src/migration/**/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  }

  @Module({
    imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      TodosModule,
      UsersModule
    ],
  })
  class AppModule {}

  return AppModule;
}
