// deps
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { IsEnum, IsString, IsUUID } from 'class-validator';

// app
import BaseEntity from '@/base/entity';
import User from '@modules/users/entities/users.entity';

// internal module
import { ETodoStatus } from '../enums/todos.enum';
import TodoItem from './todoItems.entity';

@Entity('todos')
export default class Todo extends BaseEntity {
  @IsUUID()
  @Column({ length: 36 })
  id: string;

  @IsString()
  @Column({ length: 255 })
  activity: string;

  @IsEnum(ETodoStatus)
  @Column({ default: ETodoStatus.TODO })
  status: ETodoStatus;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.id)
  items: TodoItem[];
}
