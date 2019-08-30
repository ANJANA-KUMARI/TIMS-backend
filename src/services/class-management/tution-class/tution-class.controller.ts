import * as tutionClassService from "./tution-class.service";

export const getAllGrades = async () => {
  const allGrades = await tutionClassService.getAllGrades();
  return allGrades;
};

export const getAllTypes = async () => {
  const allTypes = await tutionClassService.getAllTutionClassTypes();
  return allTypes;
};

export const getAllTeachers = async () => {
  const allTeachers = await tutionClassService.getAllTeachers();
  return allTeachers;
};
