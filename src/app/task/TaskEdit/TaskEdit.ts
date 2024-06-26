import {
  Task,
  TaskDescription,
  TaskRepository,
  TaskTitle,
  TaskCreatedAt,
  TaskId,
} from 'src/domain/task';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';

export class TaskEdit {
  constructor(private repository: TaskRepository) {}
  async run(
    id: number,
    title: string,
    description: string,
    createdAt: Date,
  ): Promise<TaskEntity> {
    const rolEdit = new Task(
      new TaskTitle(title),
      new TaskDescription(description),
      new TaskCreatedAt(createdAt),
      new TaskId(id),
    );
    return await this.repository.edit(rolEdit);
  }
}
