import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from './drone.entity';
import { DroneStatus } from './droneStatus.entity';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(Drone) private droneRepo: Repository<Drone>,
    @InjectRepository(DroneStatus)
    private droneStatusRepo: Repository<DroneStatus>,
  ) {}

  create(name: string, model: string) {
    const drone = this.droneRepo.create({
      name,
      model,
    });

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

  async findOne(id: number) {
    const drone = await this.droneRepo.findOne(id);
    if (!drone) {
      throw new NotFoundException('Drone not found');
    }
    return drone;
  }

  findAll() {
    return this.droneRepo.find();
  }
}
