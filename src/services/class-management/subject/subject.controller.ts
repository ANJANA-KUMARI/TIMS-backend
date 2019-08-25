import * as subjectService from './subject.service';

export const createSubject = async (subjectName: string, color: string) => {
  const insertedSubject = await subjectService.createSubject(
    subjectName,
    color
  );
  return insertedSubject;
};

export const getAllSubjects = async () => {
  const allSubjects = await subjectService.getAllSubjects();
  return allSubjects;
};

export const getSubjectById = async (id: number) => {
  const subject = await subjectService.getSubjectById(id);
  return subject;
};

export const deleteSubject = async (subjectId: number) => {
  await subjectService.deleteSubject(subjectId);
};

export const updateSubject = async (
  subjectId: number,
  name: string,
  color: string
) => {
  const updatedSubject = await subjectService.updateSubject(
    subjectId,
    name,
    color
  );
  return updatedSubject;
};
