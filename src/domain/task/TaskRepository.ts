import { TaskEntity } from "src/infrastructure/Entity/taskEntity";
import { Task } from "./Task";
import { TaskId } from "./TaskId";


export interface TaskRepository {
  create(task:Task): Promise<TaskEntity>;
  getAll(): Promise<Task[]>;
  getOneById(id: TaskId): Promise<Task | null>;
  edit(task: Task): Promise<TaskEntity>;
  delete(id: TaskId): Promise<TaskEntity>;
}