// deps
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

// internal module
import Todo from '../entities/todos.entity';

@Injectable()
export default class TodoService extends TypeOrmCrudService<Todo> {
  constructor(
    @InjectRepository(Todo)
    protected readonly repo: Repository<Todo>
  ) {
    super(repo)
  }
}
