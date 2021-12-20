import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateDroneDto {
  @IsNotEmpty()
  @IsObject()
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
