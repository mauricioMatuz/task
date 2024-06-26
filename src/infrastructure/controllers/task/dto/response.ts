import { IsNumber, IsString } from "class-validator";

export class TaskResponseDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  createdAt: string;
}
