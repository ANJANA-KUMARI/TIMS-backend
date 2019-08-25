import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(name: string, color: string) {
    this.id = 0;
    this.name = name;
    this.color = color;
  }
}
