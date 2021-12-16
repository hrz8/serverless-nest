// deps
import { Column, Entity, OneToMany } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';

// app
import BaseEntity from '@/base/entity';
import Todo from '@modules/todos/entities/todos.entity';

@Entity('users')
export default class User extends BaseEntity {
  @IsUUID()
  @Column({ length: 36 })
  id: string;

  @IsString()
  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.id)
  todos: Todo[];
}
