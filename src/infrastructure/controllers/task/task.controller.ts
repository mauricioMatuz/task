import {
  Controller,
  Get,
  Post,
  Inject,
  NotFoundException,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  TaskCreate,
  TaskDelete,
  TaskEdit,
  TaskGetAll,
  TaskGetOneById,
} from 'src/app/task';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';
import { TaskResponseDto } from './dto/response';
import { FindOneParams } from '../users/dto/validation';
import { TaskNotFoundError } from 'src/app/task/TaskGetOneById/TaskNotFoundError';
import { Create, Edit } from './dto/validation';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('TaskGetAll') private readonly taskGetAll: TaskGetAll,
    @Inject('TaskGetOneById') private readonly taskGetOne: TaskGetOneById,
    @Inject('TaskEdit') private readonly taskEdit: TaskEdit,
    @Inject('TaskDelete') private readonly taskDelete: TaskDelete,
    @Inject('TaskCreate') private readonly taskCreate: TaskCreate,
  ) {}
  private mapToDto(taskEntity: TaskEntity): TaskResponseDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      createdAt: taskEntity.createdAt.toISOString(),
    };
  }
  @Get()
  async tasks() {
    return (await this.taskGetAll.run()).map((task) => task.toPlainObject());
  }
  @Get(':id')
  async task(@Param() params: FindOneParams) {
    try {
      return (await this.taskGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
      throw error;
    }
  }
  @Post()
  async create(@Body() body: Create) {
    const create = await this.taskCreate.run(
      body.title,
      body.description,
      new Date(),
    );
    return this.mapToDto(create);
  }
  @Put(':id')
  async edit(@Param() params: FindOneParams, @Body() body: Edit) {
    const put = await this.taskEdit.run(
      params.id,
      body.title,
      body.description,
      new Date(),
    );
    return this.mapToDto(put);
  }

  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    await this.taskDelete.run(params.id);
  }
}
