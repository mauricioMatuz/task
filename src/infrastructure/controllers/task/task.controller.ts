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
  UseGuards,
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
import { Role } from '../../../common/enums/role.enum';
import { AuthGuard } from '../../../common/guard/auth/auth.guard';
import { request } from 'http';
import { RolesGuard } from 'src/common/guard/rol/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { DecoderToken } from 'src/common/decorators/tokendecoder.decorator';
import { MyTask } from 'src/app/task/MyTask/MyTask';
import { MyFinish } from 'src/app/task/MyFinish/MyFinish';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('TaskGetAll') private readonly taskGetAll: TaskGetAll,
    @Inject('TaskGetOneById') private readonly taskGetOne: TaskGetOneById,
    @Inject('TaskEdit') private readonly taskEdit: TaskEdit,
    @Inject('TaskDelete') private readonly taskDelete: TaskDelete,
    @Inject('TaskCreate') private readonly taskCreate: TaskCreate,
    @Inject('MyTask') private readonly taskMy: MyTask,
    @Inject('MyTaskFinish') private readonly taskMyFinish: MyFinish,
  ) {}
  private mapToDto(taskEntity: TaskEntity): TaskResponseDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      userId: taskEntity.userId,
      user: taskEntity.user,
      createdAt: taskEntity.createdAt.toISOString(),
    };
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async tasks() {
    return (await this.taskGetAll.run()).map((task) => task.toPlainObject());
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async task(@Param() params: FindOneParams) {
    try {
      return (await this.taskGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
      throw error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('my/task')
  async myTask(@DecoderToken() params) {
    try {
      const userId = params.sub;
      return (await this.taskMy.run(userId)).map((task) =>
        task.toPlainObject(),
      );
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
      throw error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/my/finish')
  async myFinish(@DecoderToken() params) {
    try {
      const userId = params.sub;
      return (await this.taskMyFinish.run(userId)).map((task) =>
        task.toPlainObject(),
      );
    } catch (error) {
      if (error instanceof TaskNotFoundError) return new NotFoundException();
      throw error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: Create) {
    try {
      const create = await this.taskCreate.run(
        body.title,
        body.description,
        new Date(),
        body.userId,
        body.deadline,
      );
      return this.mapToDto(create);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async edit(@Param() params: FindOneParams, @Body() body: Edit) {
    const put = await this.taskEdit.run(
      params.id,
      body.title,
      body.description,
      new Date(),
      body.userId,
      body.deadline,
      body.user,
    );
    return this.mapToDto(put);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Param() params: FindOneParams) {
    await this.taskDelete.run(params.id);
  }
}
