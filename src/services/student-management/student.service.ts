import dbCon from '../../utils/db';
import { Student } from './student.entity';
import { Connection } from 'typeorm';
import { TutionClass } from '../class-management/tution-class/entities/tution-class.entity';

let con: Connection;

const getStudentRepo = async () => {
  con = await dbCon;
  const repo = con.getRepository(Student);
  return repo;
};

const getClassRepo = async () => {
  const con = await dbCon;
  const classRepo = con.getRepository(TutionClass);
  return classRepo;
};

export const createStudent = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
  classIds: number[]
): Promise<Student | null> => {
  let student = new Student(firstName, lastName, email, phone, address);

  const studentRepo = await getStudentRepo();

  const classRepo = await getClassRepo();

  // get subject
  const classList: TutionClass[] = [];

  for (let i = 0; i < classIds.length; i++) {
    const id = classIds[i];
    const tClass = await classRepo.findOne(id);
    classList.push(tClass as TutionClass);
  }

  student.tutionClasses = classList;
  await studentRepo.insert(student);
  return student;
};

export const getAllStudents = async (): Promise<Student[]> => {
  const studentRepo = await getStudentRepo();

  const allStudents = await studentRepo.find({
    relations: [
      'tutionClasses',
      'teacher',
      'subject',
      'type',
      'grades',
      'studyMaterials',
      'students'
    ]
  });
  return allStudents;
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  const studentRepo = await getStudentRepo();

  const student = (await studentRepo.findOne(id)) || null;
  return student;
};

export const updateStudent = async (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
  classIds: number[]
): Promise<Student> => {
  const studentRepo = await getStudentRepo();
  const classRepo = await getClassRepo();

  const studentToUpdate = new Student(
    firstName,
    lastName,
    email,
    phone,
    address
  );
  studentToUpdate.id = id;

  const classList: TutionClass[] = [];
  for (let i = 0; i < classIds.length; i++) {
    const id = classIds[i];
    const tClass = await classRepo.findOne(id, {
      relations: [
        'teacher',
        'subject',
        'type',
        'grades',
        'studyMaterials',
        'students'
      ]
    });
    classList.push(tClass as TutionClass);
  }
  studentToUpdate.tutionClasses = classList;
  await studentRepo.save(studentToUpdate);
  return studentToUpdate;
};

export const deleteStudent = async (id: number) => {
  const studentRepo = await getStudentRepo();

  const studentToDelete: Student = (await studentRepo.findOne(id))!;
  await studentRepo.remove(studentToDelete);
  return;
};
