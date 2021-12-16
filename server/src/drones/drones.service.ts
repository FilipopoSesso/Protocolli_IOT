import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from './drone.entity';

@Injectable()
export class DronesService {
  constructor(@InjectRepository(Drone) private repo: Repository<Drone>) {}

  create(position: number[], battery: number, speed: number, altitude: number) {
    const drone = this.repo.create({
      latitude: position[0],
      longitude: position[1],
      battery,
      speed,
      altitude,
    });
    return this.repo.save(drone);
  }

  async findOne(id: number) {
    const drone = await this.repo.findOne(id);
    if (!drone) {
      throw new NotFoundException('Drone not found');
    }
    return drone;
  }

  findAll() {
    return this.repo.find();
  }
}
