import {
  Task,
  TaskCreatedAt,
  TaskDescription,
  TaskId,
  TaskRepository,
  TaskTitle,
  TaskUser,
  TaskUserId,
} from 'src/domain/task';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class TaskCreate {
  constructor(private repository: TaskRepository) {}

  async run(
    title: string,
    description: string,
    createdAt: Date,
    userId: number,
    user?: UserEntity,
    id?: number,
  ): Promise<TaskEntity> {
    const task = new Task(
      new TaskTitle(title),
      new TaskDescription(description),
      new TaskCreatedAt(createdAt),
      new TaskUserId(userId),
      user ? new TaskUser(user) : null,
      new TaskId(id),
    );
    return await this.repository.create(task);
  }
}
