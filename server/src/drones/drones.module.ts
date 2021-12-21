import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './drone.entity';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { DroneStatus } from './droneStatus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone, DroneStatus])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
