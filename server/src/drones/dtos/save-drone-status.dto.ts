import { IsNotEmpty, IsNumber, IsNotEmptyObject } from 'class-validator';

export class SaveDroneStatusDto {
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
