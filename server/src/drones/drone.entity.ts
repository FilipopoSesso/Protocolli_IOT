import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
//import { DroneStatus } from './droneStatus.entity';

@Entity()
export class Drone {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  id: string;

  @Column()
  model: string;

  @Column({nullable: true})
  customer: string;

  @Column({nullable: true})
  rentalStart: Date;

  @Column({nullable: true})
  rentalEnd: Date;

  @Column({nullable: true})
  state: boolean;
  // @OneToMany(() => DroneStatus, droneStatus => droneStatus.drone)
  // status: DroneStatus[]
}
