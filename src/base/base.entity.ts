import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class VersionEntity {
  @Column({ nullable: true })
  appVersionName?: string;

  @Column({ nullable: true })
  appVersionCode?: string;

  @Column({ nullable: true })
  serviceVersionCode?: string;
}

export default class BaseEntity extends VersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
