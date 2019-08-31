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

export const createTutionClass = async (
  venue: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  teacherId: number,
  gradeIds: number[],
  tutionClassTypeId: number,
  subjectId: number
) => {
  const insertedClass = await tutionClassService.createClass(
    venue,
    date,
    startTime,
    endTime,
    teacherId,
    gradeIds,
    tutionClassTypeId,
    subjectId
  );
  return insertedClass;
};

export const deleteTutionClass = async (tutionClassId: number) => {
  await tutionClassService.deleteTutionClass(tutionClassId);
};

export const getAllTutionClasses = async () => {
  const allTutionClasses = await tutionClassService.getAllTutionClasses();
  return allTutionClasses;
};

export const getTutionClassById = async (id: number) => {
  const subject = await tutionClassService.getTutionClassById(id);
  return subject;
};

export const updateTutionClass = async (
  id: number,
  venue: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  teacherId: number,
  gradeIds: number[],
  tutionClassTypeId: number,
  subjectId: number
) => {
  const updatedTutionClass = await tutionClassService.updateTutionClass(
    id,
    venue,
    date,
    startTime,
    endTime,
    teacherId,
    gradeIds,
    tutionClassTypeId,
    subjectId
  );
  return updatedTutionClass;
};
