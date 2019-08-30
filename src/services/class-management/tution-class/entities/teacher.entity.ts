import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TutionClass } from "./tution-class.entity";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @OneToMany(type => TutionClass, tutionClass => tutionClass.teacher)
  tutionClasses: TutionClass[];

  constructor(firstName: string, lastName: string, avatar: string) {
    this.id = 0;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
    this.tutionClasses = null!;
  }
}
