import { TaskEntity } from "src/infrastructure/Entity/taskEntity";
import { Task } from "./Task";
import { TaskId } from "./TaskId";
import { MyTask } from "src/app/task/MyTask/MyTask";
import { TaskStatus } from "./TaskStatus";


export interface TaskRepository {
  create(task: Task): Promise<TaskEntity>;
  getAll(active: TaskStatus): Promise<Task[]>;
  getOneById(id: TaskId): Promise<Task | null>;
  edit(task: Task): Promise<TaskEntity>;
  delete(id: TaskId): Promise<TaskEntity>;
  getMyTask(id: TaskId): Promise<Task[]>;
  getFinishTask(id: TaskId): Promise<Task[]>;
}
