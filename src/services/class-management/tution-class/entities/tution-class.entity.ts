import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Subject } from '../../subject/subject.entity';
import { Grade } from './grade.entity';
import { type } from 'os';
import { TutionClassType } from './tution-class-type.entity';

@Entity()
export class TutionClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  venue: string;

  @Column()
  dateTime: Date;

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

  constructor(venue: string, datetime: Date) {
    this.id = 0;
    this.grades = null!;
    this.subject = null!;
    this.type = null!;
    this.venue = venue;
    this.dateTime = datetime;
  }
}
