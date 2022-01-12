import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DronesModule } from './drones/drones.module';
import { Drone } from './drones/drone.entity';
import { DroneStatus } from './drones/droneStatus.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Drone, DroneStatus],
      synchronize: true, //only for development environment. It automates migrations by changing the db everytime the entity is changed
    }),
    DronesModule,
  ],
})
export class AppModule {}
