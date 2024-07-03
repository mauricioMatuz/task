import { IsArray, IsBoolean, IsBooleanString, IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class Active{
  @IsBooleanString()
  active: boolean;
}

export class Create {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  rolId: number;
  @IsString()
  password: string;
}

export class Login {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class Edit {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  rolId: number;
  @IsString()
  password: string;
}
