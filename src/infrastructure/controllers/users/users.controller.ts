import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetAll,
  UserGetOneById,
} from 'src/app/user';
import { Create, Edit, FindOneParams } from './dto/validation';
import { UserNotFoundError } from 'src/domain';
import { UserResponseDto } from './dto/response';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

@Controller('user')
export class UsersController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOne: UserGetOneById,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserEdit') private readonly userEdit: UserEdit,
    @Inject('UserDelete') private readonly userDelete: UserDelete,
  ) {}

  private mapToDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      rolId: userEntity.rolId,
      // taskId: userEntity.taskId,
      createdAt: userEntity.createdAt.toISOString(), // o como prefieras formatear la fecha
    };
  }
  @Get()
  async users() {
    return (await this.userGetAll.run()).map((user) => user.toPlainObject());
  }
  @Get(':id')
  async user(@Param() params: FindOneParams) {
    try {
      return (await this.userGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof UserNotFoundError) return new NotFoundException();
      throw error;
    }
  }

  @Post()
  async create(@Body() body: Create) {
    try {
      console.log(body);
      const create = await this.userCreate.run(
        body.name,
        body.email,
        new Date(),
        body.rolId,
        // body.tareaIds,
      );
      const dto = this.mapToDto(create);
      return dto;
    } catch (error) {
      console.log(error,"erorcito");
    }
  }
  @Put(':id')
  async edit(@Param() param: FindOneParams, @Body() body: Edit) {
    const user = await this.userEdit.run(
      param.id,
      body.name,
      body.email,
      new Date(),
      body.rolId,
      // body.taskId,
    );
    const dto = this.mapToDto(user);
    return dto;
  }

  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    return await this.userDelete.run(params.id);
  }
}
