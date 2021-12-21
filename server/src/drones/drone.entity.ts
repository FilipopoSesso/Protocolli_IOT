import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DroneStatus } from './droneStatus.entity';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @OneToMany(() => DroneStatus, droneStatus => droneStatus.drone)
  status: DroneStatus[]
}
