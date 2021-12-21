import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDroneDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  customer: string;

  @IsOptional()
  @IsDate()
  rentalStart: Date;

  @IsOptional()
  @IsDate()
  rentalEnd: Date;

  @IsOptional()
  @IsBoolean()
  state: boolean;
}
