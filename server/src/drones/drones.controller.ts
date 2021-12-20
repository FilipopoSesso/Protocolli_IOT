import {
  Body,
  Controller,
  Get,
  Ip,
  Logger,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateDroneDto } from 'src/drones/dtos/create-drone.dto';
import { DronesService } from './drones.service';

@Controller('v1/drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}
  private readonly logger = new Logger(DronesController.name);

  @Get()
  getAllDrones(@Ip() ip: string) {
    this.logger.log(`GET - /v1/drones - ${ip}`);
    return this.dronesService.findAll();
  }

  @Get('/:id')
  async getDrone(@Param('id',ParseIntPipe) id: number, @Ip() ip: string) {
    this.logger.log(`GET - /v1/drones/${id} - ${ip}`);
    const drone = await this.dronesService.findOne(id);
    return drone;
  }

  @Post()
  createDrone(@Body() body: CreateDroneDto, @Ip() ip: string) {
    this.logger.log(`POST - /v1/drones - ${ip}`);
    this.logger.log(body);
    return this.dronesService.create(
      body.position,
      body.battery,
      body.speed,
      body.altitude,
    );
  }
}
