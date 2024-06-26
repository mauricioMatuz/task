import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './userEntity';
import { TaskUserEntity } from './taskUserEntity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  createdAt: Date;
  @ManyToMany(() => UserEntity, (taskUser) => taskUser.tasks)
  users: TaskUserEntity[];
}
