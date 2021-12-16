// deps
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

// internal module
import Todo from '../entities/todos.entity';
import TodoService from '../services/todos.service';

@Crud({
  model: {
    type: Todo
  }
})
@Controller('todos')
export default class TodoController {
  constructor(
    protected readonly service: TodoService
  ) {}
}
