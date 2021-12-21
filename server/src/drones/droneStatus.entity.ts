import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Drone } from './drone.entity';

@Entity()
export class DroneStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  battery: number;

  @Column()
  speed: number;

  @Column('float')
  altitude: number;

  @ManyToOne(() => Drone, drone => drone.status)
  drone: Drone
}
