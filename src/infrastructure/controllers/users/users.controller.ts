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
  UseGuards,
} from '@nestjs/common';
import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetAll,
  UserGetOneById,UserLogin
} from 'src/app/user';
import { Create, Edit, FindOneParams, Login } from './dto/validation';
import { UserResponseDto } from './dto/response';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import { UserNotFoundError } from 'src/domain';
import { AuthGuard } from './guard/auth/auth.guard';
import { Roles } from '../rol/decorators/roles.decorator';
import { Role } from '../rol/enums/role.enum';
import { RolesGuard } from '../rol/guards/roles.guard';

@Controller('user')
export class UsersController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOne: UserGetOneById,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserEdit') private readonly userEdit: UserEdit,
    @Inject('UserDelete') private readonly userDelete: UserDelete,
    @Inject('UserLogin') private readonly userLogin: UserLogin,
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
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
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
      const create = await this.userCreate.run(
        body.name,
        body.email,
        new Date(),
        body.rolId,
        body.password,
      );
      const dto = this.mapToDto(create);
      return dto;
    } catch (error) {
      console.log(error, 'erorcito');
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
      body.password,
    );
    const dto = this.mapToDto(user);
    return dto;
  }

  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    return await this.userDelete.run(params.id);
  }
  @Post('login')
  async login(@Body() body: Login) {
    try {
      return await this.userLogin.run(body.email, body.password);
    } catch (error) {
      if (error instanceof UserNotFoundError) return new NotFoundException();
      throw error;
    }
  }
}
