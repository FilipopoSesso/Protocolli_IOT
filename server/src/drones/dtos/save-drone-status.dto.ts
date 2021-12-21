import { IsNotEmpty, IsNumber, IsNotEmptyObject } from 'class-validator';
import { Drone } from '../drone.entity';

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
  
  @IsNotEmpty()
  drone: Drone
}
