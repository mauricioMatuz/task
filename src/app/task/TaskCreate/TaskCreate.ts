import { Task, TaskCreatedAt, TaskDescription, TaskId, TaskRepository, TaskTitle } from "src/domain/task";
import { TaskEntity } from "src/infrastructure/Entity/taskEntity";

export class TaskCreate{
    constructor(private repository:TaskRepository) {
        
    }

    async run(title: string, description: string, createdAt: Date, id?: number): Promise<TaskEntity> {
        const task = new Task(
            new TaskTitle(title),
            new TaskDescription(description),
            new TaskCreatedAt(createdAt),
            new TaskId(id),
        );
        return await this.repository.create(task);
    }
}