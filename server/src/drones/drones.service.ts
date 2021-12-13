import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from './drone.entity';

@Injectable()
export class DronesService {
  constructor(@InjectRepository(Drone) private repo: Repository<Drone>) {}

  create(
    latitude: number,
    longitude: number,
    battery: number,
    altitude: number,
  ) {
    const drone = this.repo.create({ latitude, longitude, battery, altitude });
    return this.repo.save(drone);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  findAll(){
      return this.repo.find();
  }
}
