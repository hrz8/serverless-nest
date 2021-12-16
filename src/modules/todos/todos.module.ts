// deps
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal module
import TodoController from './controllers/todos.controller';
import TodoItem from './entities/todoItems.entity';
import Todo from './entities/todos.entity';
import TodoService from './services/todos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo,
      TodoItem
    ]),
  ],
  controllers: [
    TodoController
  ],
  providers: [
    TodoService,
  ],
})
export class TodosModule {}
