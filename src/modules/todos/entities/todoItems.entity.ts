// deps
import { Column, Entity, OneToOne } from 'typeorm';
import { IsNumber, IsString, IsUUID } from 'class-validator';

// app
import BaseEntity from '@/base/entity';

// internal module
import Todo from './todos.entity';

@Entity('todo_items')
export default class TodoItem extends BaseEntity {
  @IsUUID()
  @Column({ length: 36 })
  id: string;

  @IsString()
  @Column({ length: 255 })
  name: string;

  @IsNumber()
  @Column({ default: 1 })
  qty: number;

  @OneToOne(() => Todo, (todo) => todo.id)
  todo: Todo;
}
