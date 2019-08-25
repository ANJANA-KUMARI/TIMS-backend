import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryColumn()
  id: number;

  @Column()
  val: number;

  constructor(id: number, val: number) {
    this.id = id;
    this.val = val;
  }
}
