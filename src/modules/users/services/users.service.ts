// deps
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal module
import User from '../entities/users.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly repo: Repository<User>
  ) {}
}
