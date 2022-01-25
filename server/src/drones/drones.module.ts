import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboundResponseSerializer } from '../serializers/outbound-response-mqtt.serialize';
import { Drone } from './drone.entity';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { DroneStatus } from './droneStatus.entity';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exDrone',
          type: 'topic',
        },
      ],
      uri: 'amqps://uvoymuqw:FAehs0r_Uuz-bfDsM92DnFnGKKvZVRR8@roedeer.rmq.cloudamqp.com/uvoymuqw',
    }),
    DronesModule, 
    TypeOrmModule.forFeature([Drone, DroneStatus]),
  ],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
