// deps
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal module
import UserController from './controllers/users.controller';
import User from './entities/users.entity';
import UserService from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
  ],
})
export class UsersModule {}
