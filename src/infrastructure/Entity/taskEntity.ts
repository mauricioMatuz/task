import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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
  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
