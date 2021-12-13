import { IsNumber } from 'class-validator';

export class CreateDroneDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  battery: number;

  @IsNumber()
  altitude: number;
}
