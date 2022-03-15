// deps
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal module
import Todo from '../entities/todos.entity';

@Injectable()
export default class TodoService {
  constructor(
    @InjectRepository(Todo)
    protected readonly repo: Repository<Todo>
  ) {}

  public async sendSNS() {
    console.log("send");
  }
}
