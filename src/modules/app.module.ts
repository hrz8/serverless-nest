import {Module} from '@nestjs/common';
import { TodosModule } from './todos/todos.module';

export function moduleFactory(): any {
  @Module({
    imports: [TodosModule],
  })
  class AppModule {}

  return AppModule;
}
