import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Task,
  TaskCreatedAt,
  TaskDescription,
  TaskId,
  TaskRepository,
  TaskTitle,
} from 'src/domain/task';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly respository: Repository<TaskEntity>,
  ) {}
  private mapToDomain(task: TaskEntity) {
    return new Task(
      new TaskTitle(task.title),
      new TaskDescription(task.description),
      new TaskCreatedAt(task.createdAt),
      new TaskId(task.id),
    );
  }
  async create(task: Task): Promise<TaskEntity> {
    return await this.respository.save({
      title: task.title.value,
      description: task.description.value,
      createdAt: task.createdAt.value,
    });
  }
  async getAll(): Promise<Task[]> {
    const task = await this.respository.find();
    return task.map((taskEntity) => this.mapToDomain(taskEntity));
  }
  async getOneById(id: TaskId): Promise<Task> {
    const task = await this.respository.findOne({ where: { id: id.value } });
    if (!task) return null;
    return this.mapToDomain(task);
  }
  async edit(task: Task): Promise<TaskEntity> {
    await this.respository.update(task.id.value, {
      title: task.title.value,
      description: task.description.value,
      createdAt: task.createdAt.value,
    });
    return await this.respository.findOne({ where: { id: task.id.value } });
  }
  async delete(id: TaskId): Promise<TaskEntity> {
    await this.respository.delete(id.value);
    return await this.respository.findOne({
      where: { id: id.value },
    });
  }
}
