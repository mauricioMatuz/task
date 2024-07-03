import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class Create {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
  @IsBoolean()
  active: boolean;
}

export class Edit {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
  @IsBoolean()
  active: boolean;
  user: UserEntity;
}