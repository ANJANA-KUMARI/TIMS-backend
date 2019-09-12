import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class EmployeeType {
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(type => Employee, employee => employee.type)
  employees: Employee[];

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
    this.employees = null!;
  }
}
