import { IsArray, IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class Create {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  rolId: number;
  @IsArray()
  tareaIds: number[];
}

export class Edit {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  rolId: number;
  @IsArray()
  taskId: number[];
}
