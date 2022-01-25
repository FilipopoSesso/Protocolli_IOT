import {
  Body,
  Controller,
  Get,
  Inject,
  Ip,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaveDroneStatusDto } from './dtos/save-drone-status.dto';
import { CreateDroneDto } from './dtos/create-drone.dto';
import { DronesService } from './drones.service';
import { UpdateDroneDto } from './dtos/update-drone.dto';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@ApiTags('Drones')
@Controller('v1/drones')
export class DronesController {
  constructor(
    private dronesService: DronesService,
  ) //@Inject('drone_service') private client: ClientProxy,
  {
    //client.connect();
  }
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
  async getLastDroneStatus(@Param('id') id: string, @Ip() ip: string) {
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
  updateDrone(
    @Param('id') id: string,
    @Body() body: UpdateDroneDto,
    @Ip() ip: string,
  ) {
    this.logger.log(`Patch - /v1/drones/${id} - ${ip}`);
    this.logger.log(body);
    return this.dronesService.update(id, body);
  }

  // @EventPattern('v1/drones/*/data/all')
  // saveDroneStatus(
  //   @Payload() data: any,
  //   @Ctx() context: RmqContext,
  // ) {
  //   this.logger.log(data);
  //   this.dronesService.saveStatus(
  //     data.position,
  //     data.battery,
  //     data.speed,
  //     data.altitude,
  //     data.drone,
  //   );

  //   // let positionData = { id: data.drone, position: data.position };
  //   // const record = new RmqRecordBuilder(positionData).build();

  //   // this.client
  //   //   .send(`v1/drones/${data.drone}/currentposition`, record)
  //   //   .subscribe();
  // }
}
