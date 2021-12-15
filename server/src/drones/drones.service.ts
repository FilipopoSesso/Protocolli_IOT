import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from './drone.entity';

@Injectable()
export class DronesService {
  constructor(@InjectRepository(Drone) private repo: Repository<Drone>) {}

  create(position: number[], battery: number, altitude: number) {
    const drone = this.repo.create({
      latitude: position[0],
      longitude: position[1],
      battery,
      altitude,
    });
    return this.repo.save(drone);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  findAll() {
    return this.repo.find();
  }
}
