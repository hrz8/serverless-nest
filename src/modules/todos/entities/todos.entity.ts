// deps
import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsEnum, IsString, IsUUID } from 'class-validator';

// app
import BaseEntity from '@base/base.entity';
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

  @IsString()
  @Column({ nullable: false })
  userId: string

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.id)
  items: TodoItem[];
}
