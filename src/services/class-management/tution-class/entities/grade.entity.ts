import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { TutionClass } from './tution-class.entity';

@Entity()
export class Grade {
  @PrimaryColumn()
  id: number;

  @Column()
  val: number;

  @ManyToMany(type => TutionClass, tutionClass => tutionClass.grades)
  tutionClasses: TutionClass[];

  constructor(id: number, val: number) {
    this.id = id;
    this.val = val;
    this.tutionClasses = null!;
  }
}
