import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({description: 'format: YYYY-MM-DD hh:mm:ss', example:'2021-12-25 10:50:20'})
  @IsOptional()
  @IsDateString()
  rentalStart;

  @ApiProperty({description: 'format: YYYY-MM-DD hh:mm:ss', example:'2021-12-25 10:50:20'})
  @IsOptional()
  @IsDateString()
  rentalEnd;

  @IsOptional()
  @IsBoolean()
  state: boolean;
}
