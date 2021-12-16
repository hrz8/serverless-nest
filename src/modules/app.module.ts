// deps
import { Module } from '@nestjs/common';

// app
import { IDBConfig } from '@/types/dbconfig.interface';
import { TodosModule } from '@modules/todos/todos.module';

interface IAppModule {}

export function moduleFactory({ host, port, username, password }: IDBConfig): IAppModule {
  @Module({
    imports: [TodosModule],
  })
  class AppModule {}

  return AppModule;
}
