// deps
import { Module } from '@nestjs/common';

// app
import { IDBConfig } from '@/types/dbconfig.interface';

// internal
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

interface IAppModule {}

export function moduleFactory({ host, port, username, password }: IDBConfig): IAppModule {
  @Module({
    imports: [TodosModule, UsersModule],
  })
  class AppModule {}

  return AppModule;
}
