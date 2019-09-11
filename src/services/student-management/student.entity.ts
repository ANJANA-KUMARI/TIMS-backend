import {
  Entity,
  Column,
  ManyToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  JoinTable
} from 'typeorm';
import { TutionClass } from '../class-management/tution-class/entities/tution-class.entity';
import { add } from 'winston';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text')
  address: string;

  @ManyToMany(type => TutionClass, tutionClass => tutionClass.students)
  @JoinTable()
  tutionClasses: TutionClass[];

  constructor(
    fname: string,
    lname: string,
    email: string,
    phone: string,
    addr: string
  ) {
    this.id = 0;
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.address = addr;
    this.phone = phone;

    this.tutionClasses = null!;
  }
}
