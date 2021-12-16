import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDroneDto {
  @IsNotEmpty()
  @IsArray()
  position: number[];

  @IsNotEmpty()
  @IsNumber()
  battery: number;

  @IsNotEmpty()
  @IsNumber()
  speed: number;

  @IsNotEmpty()
  @IsNumber()
  altitude: number;
}
