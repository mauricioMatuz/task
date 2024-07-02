import { IsDate, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class Create {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
  @IsDate()
  deadline: Date;
}

export class Edit {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
  @IsDate()
  deadline: Date;
  user: UserEntity;
}