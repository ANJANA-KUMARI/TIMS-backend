import dbCon from "../../utils/db";
import { Employee } from "./employee.entity";
import { Subject } from "../class-management/subject/subject.entity";
import { Connection } from "typeorm";

let con: Connection;

const getEmployeeRepo = async () => {
  con = await dbCon;
  const repo = con.getRepository(Employee);
  return repo;
};

const getSubjectRepo = async () => {
  const con = await dbCon;
  const subjectRepo = con.getRepository(Subject);
  return subjectRepo;
};

export const createEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: number,
  subjectId: number
): Promise<Employee | null> => {
  let employee = new Employee(firstName, lastName, email, phone, address);

  const employeeRepo = await getEmployeeRepo();

  const subjectRepo = await getSubjectRepo();

  // get subject
  const subjectOfEmployee = await subjectRepo.findOne(subjectId);

  if (subjectOfEmployee === undefined) {
    // error
    return null;
  } else {
    employee.subject = subjectOfEmployee;
    await employeeRepo.insert(employee);
    return employee;
  }
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  const employeeRepo = await getEmployeeRepo();

  const allEmployees = await employeeRepo.find({ relations: ["subject"] });
  return allEmployees;
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  const employeeRepo = await getEmployeeRepo();

  const employee = (await employeeRepo.findOne(id)) || null;
  return employee;
};

export const updateEmployee = async (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: number,
  subjectId: number
): Promise<Employee> => {
  const employeeRepo = await getEmployeeRepo();

  const employeeToUpdate = new Employee(
    firstName,
    lastName,
    email,
    phone,
    address
  );
  employeeToUpdate.id = id;

  await employeeRepo.save(employeeToUpdate);
  return employeeToUpdate;
};

export const deleteEmployee = async (id: number) => {
  const employeeRepo = await getEmployeeRepo();

  const employeeToDelete: Employee = (await employeeRepo.findOne(id))!;
  await employeeRepo.remove(employeeToDelete);
  return;
};
