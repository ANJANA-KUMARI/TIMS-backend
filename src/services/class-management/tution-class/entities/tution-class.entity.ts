import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Subject } from "../../subject/subject.entity";
import { Grade } from "./grade.entity";
import { type } from "os";
import { TutionClassType } from "./tution-class-type.entity";
import { Teacher } from "./teacher.entity";

@Entity()
export class TutionClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  venue: string;

  @Column()
  date: Date;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(type => Teacher, teacher => teacher.tutionClasses)
  teacher: Teacher;

  @ManyToOne(type => Subject, subject => subject.tutionClasses)
  subject: Subject;

  @ManyToMany(type => Grade, grade => grade.tutionClasses)
  @JoinTable()
  grades: Grade[];

  @ManyToOne(
    type => TutionClassType,
    tutionClassType => tutionClassType.tutionClasses
  )
  type: TutionClassType;

  constructor(venue: string, date: Date, startTime: Date, endTime: Date) {
    this.id = 0;
    this.grades = null!;
    this.subject = null!;
    this.teacher = null!;
    this.type = null!;
    this.venue = venue;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
