import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import {
  UserCreate,
  UserDelete,
  UserEdit,
  UserGetAll,
  UserGetOneById,
} from 'src/app/user';
import { UserService } from 'src/infrastructure/Repository/user/user.service';
import { TaskService } from 'src/infrastructure/repository/task/task.service';
import { TaskEntity } from 'src/infrastructure/Entity/taskEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,TaskEntity])],
  controllers: [UsersController],
  providers: [
    { provide: 'UserRepository', useClass: UserService },
    {
      provide: 'UserGetAll',
      useFactory: (repository: UserService) => new UserGetAll(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetOneById',
      useFactory: (repository: UserService) => new UserGetOneById(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (repository: UserService) => new UserCreate(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserEdit',
      useFactory: (repository: UserService) => new UserEdit(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserDelete',
      useFactory: (repository: UserService) => new UserDelete(repository),
      inject: ['UserRepository'],
    },
    UserService,TaskService
  ],
})
export class UsersModule {}
