import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
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

  @ApiProperty({description: 'format: YYYY-MM-DD hh:mm:ss', example:'2021-12-25 10:50:20'})
  @IsDateString()
  @IsOptional()
  rentalStart;

  @ApiProperty({description: 'format: YYYY-MM-DD hh:mm:ss', example:'2021-12-25 10:50:20'})
  @IsDateString()
  @IsOptional()
  rentalEnd;

  @IsBoolean()
  @IsOptional()
  state: boolean;
}
