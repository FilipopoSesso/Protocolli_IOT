import {
  Body,
  Controller,
  Get,
  Ip,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaveDroneStatusDto } from './dtos/save-drone-status.dto';
import { CreateDroneDto } from './dtos/create-drone.dto';
import { DronesService } from './drones.service';
import { UpdateDroneDto } from './dtos/update-drone.dto';

@ApiTags('Drones')
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
    const drone = await this.dronesService.findOne(id);
    return drone;
  }

  @Get('/:id/status')
  async getLastDroneStatus(
    @Param('id') id: string,
    @Ip() ip: string,
  ) {
    this.logger.log(`GET - /v1/drones/${id}/status - ${ip}`);
    const lastStatus = await this.dronesService.findLast(id);
    return lastStatus;
  }

  @Post('/new')
  createDrone(@Body() body: CreateDroneDto, @Ip() ip: string) {
    this.logger.log(`POST - /v1/drones/new - ${ip}`);
    this.logger.log(body);
    return this.dronesService.create(body);
  }

  @Patch('/:id')
  updateDrone(@Param('id') id:string, @Body() body: UpdateDroneDto, @Ip() ip:string) {
    this.logger.log(`Patch - /v1/drones/${id} - ${ip}`);
    this.logger.log(body);
    return this.dronesService.update(id,body);
  }

  @Post('/status')
  saveDroneStatus(@Body() body: SaveDroneStatusDto, @Ip() ip: string) {
    this.logger.log(`POST - /v1/drones/status - ${ip}`);
    this.logger.log(body);
    return this.dronesService.saveStatus(
      body.position,
      body.battery,
      body.speed,
      body.altitude,
      body.drone,
    );
  }
}
