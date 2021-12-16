// deps
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Todo, (todo) => todo.id)
  todo: Todo;
}
