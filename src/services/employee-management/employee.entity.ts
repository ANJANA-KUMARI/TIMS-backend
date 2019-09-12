import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Subject } from "../class-management/subject/subject.entity";
import { EmployeeType } from "./employee-type.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  address: string;

  @ManyToOne(type => Subject, subject => subject.employees)
  subject: Subject;

  @ManyToOne(type => EmployeeType, employeeType => employeeType.employees)
  type: EmployeeType;

  constructor(
    fname: string,
    lname: string,
    email: string,
    phone: number,
    address: string
  ) {
    this.id = 0;
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.subject = null!;
    this.type = null!;
  }
}
