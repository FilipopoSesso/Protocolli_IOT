import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './drone.entity';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { DroneStatus } from './droneStatus.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'drone_service',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://test.mosquitto.org:1883',
          clientId: '164e59bacb4f41709bbe70eb6803c814',
        },
      },
    ]),
    TypeOrmModule.forFeature([Drone, DroneStatus]),
  ],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
