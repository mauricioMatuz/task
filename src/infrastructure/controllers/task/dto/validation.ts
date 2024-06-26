import { IsString } from 'class-validator';

export class Create {
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class Edit {
  @IsString()
  title: string;
  @IsString()
  description: string;
}