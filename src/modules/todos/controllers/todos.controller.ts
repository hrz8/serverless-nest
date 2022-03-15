// deps
import { Controller, Get } from '@nestjs/common';

// internal module
import TodoService from '../services/todos.service';

@Controller('todos')
export default class TodoController {
  constructor(
    protected readonly service: TodoService
  ) {}

  @Get('test')
  async hello() {
    return {
      test: "Hello world!"
    }
  }
}
