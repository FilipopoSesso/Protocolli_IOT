import { IsNotEmpty, IsNumber, IsNotEmptyObject } from 'class-validator';

export class CreateDroneDto {
  @IsNotEmptyObject()
  position: { lat: number; lon: number };

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
