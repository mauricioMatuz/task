import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/controllers/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './infrastructure/Entity/userEntity';
import { RolEntity } from './infrastructure/Entity/rolEntity';
import { RolModule } from './infrastructure/controllers/rol/rol.module';
import { TaskModule } from './infrastructure/controllers/task/task.module';
import { SendGridServiceService } from './infrastructure/send-grid-service/send-grid-service.service';
import { SendGridEmailModuleModule } from './infrastructure/controllers/send-grid-email-module/send-grid-email-module.module';
import { TaskEntity } from './infrastructure/Entity/taskEntity';
import { TaskUserEntity } from './infrastructure/Entity/taskUserEntity';
import { TaskUserModule } from './infrastructure/controllers/task-user/task-user.module';
import { TaskUserService } from './infrastructure/repository/task-user/task-user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, RolEntity, TaskEntity, TaskUserEntity],
      synchronize: true,
      dropSchema: false,
    }),
    UsersModule,
    RolModule,
    TaskModule,
    SendGridEmailModuleModule,
    TaskUserModule,
  ],
  controllers: [],
  providers: [SendGridServiceService, TaskUserService],
})
export class AppModule {}
