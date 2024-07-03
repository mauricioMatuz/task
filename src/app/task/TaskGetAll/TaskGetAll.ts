import { Task, TaskRepository, TaskStatus } from 'src/domain/task';

export class TaskGetAll {
  constructor(private repository: TaskRepository) {}
  async run(active: boolean): Promise<Task[]> {
    return await this.repository.getAll(new TaskStatus(active));
  }
}
