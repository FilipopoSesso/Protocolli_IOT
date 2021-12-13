import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  battery: number;

  @Column()
  altitude: number;
}
