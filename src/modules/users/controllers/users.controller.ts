// deps
import { Controller, Get } from '@nestjs/common';

// internal module
import UserService from '../services/users.service';

@Controller('users')
export default class UserController {
  constructor(
    protected readonly service: UserService
  ) {}

  @Get('test')
  async hello() {
    return {
      test: "Hello world!"
    }
  }
}
