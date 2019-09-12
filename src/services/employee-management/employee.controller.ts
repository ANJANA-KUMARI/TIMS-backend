import * as employeeService from "./employee.service";

export const createEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  subjectId: number,
  type: number
) => {
  const insertedEmployee = await employeeService.createEmployee(
    firstName,
    lastName,
    email,
    address,
    phone,
    subjectId,
    type
  );
  return insertedEmployee;
};

export const getAllEmployees = async () => {
  const allEmployees = await employeeService.getAllEmployees();
  return allEmployees;
};

export const getEmployeeById = async (id: number) => {
  const employee = await employeeService.getEmployeeById(id);
  return employee;
};

export const deleteEmployee = async (employeeId: number) => {
  await employeeService.deleteEmployee(employeeId);
};

export const updateEmployee = async (
  employeeId: number,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
  subjectId: number,
  type: number
) => {
  const updatedEmployee = await employeeService.updateEmployee(
    employeeId,
    firstName,
    lastName,
    email,
    address,
    phone,
    subjectId,
    type
  );
  return updatedEmployee;
};

export const getAllEmployeeTypes = async () => {
  return await employeeService.getAllEmployeeTypes();
};
