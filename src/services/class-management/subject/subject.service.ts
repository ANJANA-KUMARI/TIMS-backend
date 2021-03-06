import dbCon from "../../../utils/db";
import { Subject } from "./subject.entity";
import { Connection } from "typeorm";

let con: Connection;

const getSubjectRepo = async () => {
  con = await dbCon;
  const repo = con.getRepository(Subject);
  return repo;
};

export const createSubject = async (
  subjectName: string,
  color: string
): Promise<Subject> => {
  let subject = new Subject(subjectName, color);

  const subjectRepo = await getSubjectRepo();
  await subjectRepo.insert(subject);

  return subject;
};

export const getAllSubjects = async (): Promise<Subject[]> => {
  const subjectRepo = await getSubjectRepo();

  const allSubjects = await subjectRepo.find({ relations: ["tutionClasses"] });
  return allSubjects;
};

export const getSubjectById = async (id: number): Promise<Subject | null> => {
  const subjectRepo = await getSubjectRepo();

  const subject = (await subjectRepo.findOne(id)) || null;
  return subject;
};

export const updateSubject = async (
  id: number,
  name: string,
  color: string
): Promise<Subject> => {
  const subjectRepo = await getSubjectRepo();

  const subjectToUpdate = new Subject(name, color);
  subjectToUpdate.id = id;

  await subjectRepo.save(subjectToUpdate);
  return subjectToUpdate;
};

export const deleteSubject = async (id: number) => {
  const subjectRepo = await getSubjectRepo();

  const subjectToDelete: Subject = (await subjectRepo.findOne(id))!;
  await subjectRepo.remove(subjectToDelete);
  return;
};
