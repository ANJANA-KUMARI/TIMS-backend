import * as studentService from './student.service';

export const createStudent = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  classIds: number[]
) => {
  const insertedStudent = await studentService.createStudent(
    firstName,
    lastName,
    email,
    address,
    phone,
    classIds
  );
  return insertedStudent;
};

export const getAllStudents = async () => {
  const allStudents = await studentService.getAllStudents();
  return allStudents;
};

export const getStudentById = async (id: number) => {
  const student = await studentService.getStudentById(id);
  return student;
};

export const deleteStudent = async (studentId: number) => {
  await studentService.deleteStudent(studentId);
};

export const updateStudent = async (
  studentId: number,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
  classIds: number[]
) => {
  const updatedStudent = await studentService.updateStudent(
    studentId,
    firstName,
    lastName,
    email,
    address,
    phone,
    classIds
  );
  return updatedStudent;
};
