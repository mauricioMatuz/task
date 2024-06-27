import {
  Task,
  TaskDescription,
  TaskRepository,
  TaskTitle,
  TaskCreatedAt,
  TaskId,
  TaskUserId,
  TaskUser,
} from 'src/domain/task';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class TaskEdit {
  constructor(private repository: TaskRepository) {}
  async run(
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    userId: number,
    user:UserEntity
  ): Promise<TaskEntity> {
    const rolEdit = new Task(
      new TaskTitle(title),
      new TaskDescription(description),
      new TaskCreatedAt(createdAt),
      new TaskId(id),
      new TaskUser(user),
      new TaskUserId(userId),
    );
    return await this.repository.edit(rolEdit);
  }
}
