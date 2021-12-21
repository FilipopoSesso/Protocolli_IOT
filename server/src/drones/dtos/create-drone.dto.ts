import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDroneDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  model: string;
}
