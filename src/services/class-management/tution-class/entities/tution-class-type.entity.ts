import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TutionClassType {
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }
}
