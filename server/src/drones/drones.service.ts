import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from './drone.entity';
import { DroneStatus } from './droneStatus.entity';
import { SaveDroneStatusDto } from './dtos/save-drone-status.dto';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(Drone) private droneRepo: Repository<Drone>,
    @InjectRepository(DroneStatus)
    private droneStatusRepo: Repository<DroneStatus>,
  ) {}

  private readonly logger = new Logger(DronesService.name);

  async create(attrs: Partial<Drone>) {
    const exist = await this.droneRepo.findOne({ id: attrs.id });
    if (exist) {
      throw new BadRequestException(`cannot duplicate '${attrs.id}'`);
    }
    const drone = this.droneRepo.create(attrs);
    return this.droneRepo.save(drone);
  }

  async update(id: string, attrs: Partial<Drone>) {
    const drone = await this.droneRepo.findOne(id);
    if (!drone) {
      throw new NotFoundException('drone not found');
    }
    Object.assign(drone, attrs);
    return this.droneRepo.save(drone);
  }

  saveStatus(
    position: { lat: number; lon: number },
    battery: number,
    speed: number,
    altitude: number,
    drone: Drone,
  ) {
    const status = this.droneStatusRepo.create({
      latitude: position.lat,
      longitude: position.lon,
      battery,
      speed,
      altitude,
      drone,
    });
    return this.droneStatusRepo.save(status);
  }

  async findOne(id: string) {
    const drone = await this.droneRepo.findOne(id);
    if (!drone) {
      throw new NotFoundException('Drone not found');
    }
    return drone;
  }

  findAll() {
    return this.droneRepo.find();
  }

  async findLast(id: string) {
    const last = await this.droneStatusRepo.find({
      where: { drone: id },
      order: { id: 'DESC' },
      skip: 0,
      take: 1,
    });
    console.log(last);
    if (!last.length) {
      throw new NotFoundException();
    }
    return last;
  }

  //the library used for the amqp protocol limits subscribes to the service so I cannot use it in the controller
  @RabbitSubscribe({
    exchange: 'exDrone',
    routingKey: 'v1/drones/*/data/all',
    queue: 'drones_queue',
  })
  public async droneStatus(data: SaveDroneStatusDto) {
    this.logger.log(data)
    this.saveStatus(
          data.position,
          data.battery,
          data.speed,
          data.altitude,
          data.drone,
        );
  }
}
