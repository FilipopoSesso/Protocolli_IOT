import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drone {
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
}
