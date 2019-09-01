import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { Subject } from '../../subject/subject.entity';
import { Grade } from './grade.entity';
import { TutionClassType } from './tution-class-type.entity';
import { Teacher } from './teacher.entity';
import { StudyMaterial } from '../../../study-material/study-material.entity';

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

  @ManyToMany(type => Grade, grade => grade.tutionClasses, { cascade: true })
  @JoinTable()
  grades: Grade[];

  @OneToMany(type => StudyMaterial, studyMat => studyMat.tutionClass)
  studyMaterials: StudyMaterial[];

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
    this.studyMaterials = null!;
    this.venue = venue;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
