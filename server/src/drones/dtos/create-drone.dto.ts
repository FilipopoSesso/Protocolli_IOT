import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDroneDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsString()
  @IsOptional()
  customer: string;

  @IsDate()
  @IsOptional()
  rentalStart: Date;

  @IsDate()
  @IsOptional()
  rentalEnd: Date;

  @IsBoolean()
  @IsOptional()
  state: boolean;
}
