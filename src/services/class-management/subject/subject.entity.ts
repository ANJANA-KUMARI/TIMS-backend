import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TutionClass } from '../tution-class/entities/tution-class.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50
  })
  name: string;

  @Column()
  color: string;

  @OneToMany(type => TutionClass, tutionClass => tutionClass.subject)
  tutionClasses: TutionClass[];

  constructor(name: string, color: string) {
    this.id = 0;
    this.name = name;
    this.color = color;
    this.tutionClasses = null!;
  }
}
