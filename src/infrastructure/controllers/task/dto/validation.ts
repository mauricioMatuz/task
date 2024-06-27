import { IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class Create {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
}

export class Edit {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
  user:UserEntity
}