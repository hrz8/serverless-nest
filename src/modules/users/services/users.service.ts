// deps
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

// internal module
import User from '../entities/users.entity';

@Injectable()
export default class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repo: Repository<User>
  ) {
    super(repo)
  }
}
