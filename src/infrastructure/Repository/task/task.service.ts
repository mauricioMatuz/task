import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ItemEntiyTask,
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
import { Repository } from 'typeorm';

@Injectable()
export class TaskService implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly respository: Repository<TaskEntity>,
  ) {}

  private mapToDomain(task: TaskEntity) {
    const item = task.item ? task.item.map((item)=>new ItemEntiyTask(item)):[]
    // const items = taskEntity.item
    //   ? taskEntity.item.map((item) => new Item(item))
    //   : []; // Verifica si `item` no es nulo y es un array

    return new Task(
      new TaskTitle(task.title),
      new TaskDescription(task.description),
      new TaskCreatedAt(task.createdAt),
      new TaskUserId(task.userId),
      new TaskUser(task.user),
      new TaskId(task.id),
      item
    );
  }
  async create(task: Task): Promise<TaskEntity> {
    return await this.respository.save({
      title: task.title.value,
      description: task.description.value,
      userId: task.userId.value,
      createdAt: task.createdAt.value,
    });
  }
  async getAll(): Promise<Task[]> {
    const task = await this.respository.find({
      where: { active: true },
      relations: ['user'],
    });
    return task.map((taskEntity) => this.mapToDomain(taskEntity));
  }
  async getOneById(id: TaskId): Promise<Task> {
    const task = await this.respository.findOne({
      where: { id: id.value },
      relations: ['user'],
    });
    if (!task) return null;
    return this.mapToDomain(task);
  }

  async getMyTask(id: TaskId): Promise<Task[]> {
    const task = await this.respository.find({
      where: { userId: id.value, active: true },
    });
    return task.map((taskEntity) => this.mapToDomain(taskEntity));
  }

  async getFinishTask(id: TaskId): Promise<Task[]> {
    const task = await this.respository.find({
      where: { userId: id.value, active: false },
      relations: ['user', 'item'],
    });
    return task.map((taskEntity) => this.mapToDomain(taskEntity));
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
