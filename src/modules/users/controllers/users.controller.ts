// deps
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

// internal module
import User from '../entities/users.entity';
import UserService from '../services/users.service';

@Crud({
  model: {
    type: User
  }
})
@Controller('users')
export default class UserController {
  constructor(
    protected readonly service: UserService
  ) {}
}
