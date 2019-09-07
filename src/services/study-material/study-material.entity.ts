import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { TutionClass } from "../class-management/tution-class/entities/tution-class.entity";

@Entity()
export class StudyMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  fileName: string;

  @Column()
  displayableFileName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  lastUpdated: Date;

  @ManyToOne(type => TutionClass, tutionClass => tutionClass.studyMaterials, {
    onDelete: "CASCADE"
  })
  tutionClass: TutionClass;

  constructor(desc: string, fileName: string, displayFName: string) {
    this.id = 0;
    this.description = desc;
    this.fileName = fileName;
    this.displayableFileName = displayFName;

    this.createdDate = null!;
    this.lastUpdated = null!;
    this.tutionClass = null!;
  }
}
