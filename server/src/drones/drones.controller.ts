import {
  Body,
  Controller,
  Get,
  Ip,
  Logger,
  NotFoundException,
  Param,
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
  async getDrone(@Param('id') id: string, @Ip() ip: string) {
    this.logger.log(`GET - /v1/drones/${id} - ${ip}`);
    const drone = await this.dronesService.findOne(parseInt(id));
    if (!drone) {
      throw new NotFoundException('Drone not found');
    }
    return drone;
  }

  @Post()
  createDrone(@Body() body: CreateDroneDto, @Ip() ip: string) {
    this.logger.log(`POST - /v1/drones - ${ip}`);
    this.logger.log(body);
    return this.dronesService.create(
      body.position,
      body.battery,
      body.altitude,
    );
  }
}
