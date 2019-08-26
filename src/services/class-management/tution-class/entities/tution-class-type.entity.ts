import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TutionClass } from './tution-class.entity';

@Entity()
export class TutionClassType {
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(type => TutionClass, tutionClass => tutionClass.type)
  tutionClasses: TutionClass[];

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
    this.tutionClasses = null!;
  }
}
