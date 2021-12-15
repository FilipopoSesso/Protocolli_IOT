import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateDroneDto } from 'src/drones/dtos/create-drone.dto';
import { DronesService } from './drones.service';

@Controller('v1/drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @Get()
  getAllDrones() {
    return this.dronesService.findAll();
  }

  @Get('/:id')
  async getDrone(@Param('id') id: string) {
    const drone = await this.dronesService.findOne(parseInt(id));
    if (!drone) {
      throw new NotFoundException('Drone not found');
    }
    return drone;
  }

  @Post()
  async createDrone(@Body() body: CreateDroneDto) {
    const drone = await this.dronesService.create(
      body.position,
      body.battery,
      body.altitude,
    );
    return drone;
  }
}
