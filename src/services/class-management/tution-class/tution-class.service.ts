import dbCon from '../../../utils/db';
import { TutionClass } from './entities/tution-class.entity';
import { TutionClassType } from './entities/tution-class-type.entity';
import { Grade } from './entities/grade.entity';
import { Teacher } from './entities/teacher.entity';
import { Subject } from '../subject/subject.entity';

const getClassRepo = async () => {
  const con = await dbCon;
  const classRepo = con.getRepository(TutionClass);
  return classRepo;
};

const getClassTypeRepo = async () => {
  const con = await dbCon;
  const classTypeRepo = con.getRepository(TutionClassType);
  return classTypeRepo;
};

const getGradeRepo = async () => {
  const con = await dbCon;
  const gradeRepo = con.getRepository(Grade);
  return gradeRepo;
};

const getTeacherRepo = async () => {
  const con = await dbCon;
  const teacherRepo = con.getRepository(Teacher);
  return teacherRepo;
};

const getSubjectRepo = async () => {
  const con = await dbCon;
  const subjectRepo = con.getRepository(Subject);
  return subjectRepo;
};

export const createClass = async (
  venue: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  teacherId: number,
  gradeIds: number[],
  tutionClassTypeId: number,
  subjectId: number
): Promise<TutionClass | null> => {
  let tutionClass = new TutionClass(venue, date, startTime, endTime);

  const tutionClassRepo = await getClassRepo();
  const teacherRepo = await getTeacherRepo();
  const gradeRepo = await getGradeRepo();
  const classTypeRepo = await getClassTypeRepo();
  const subjectRepo = await getSubjectRepo();
  // get the teacher
  const teacherOfClass = await teacherRepo.findOne(teacherId);

  const gradesOfClass: Grade[] = [];

  for (let i = 0; i < gradeIds.length; i++) {
    const gradeId = gradeIds[i];
    const grade = await gradeRepo.findOne(gradeId);
    gradesOfClass.push(grade as Grade);
  }

  // get subject
  const subjectOfClass = await subjectRepo.findOne(subjectId);

  // get tution class type
  const typeOfClass = await classTypeRepo.findOne(tutionClassTypeId);

  if (
    teacherOfClass === undefined ||
    typeOfClass === undefined ||
    subjectOfClass === undefined
  ) {
    // error
    return null;
  } else {
    tutionClass.teacher = teacherOfClass;
    tutionClass.grades = gradesOfClass;
    tutionClass.type = typeOfClass;
    tutionClass.subject = subjectOfClass;

    await tutionClassRepo.save(tutionClass);

    return tutionClass;
  }
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
): Promise<TutionClass | null> => {
  const tutionClassToUpdate = new TutionClass(venue, date, startTime, endTime);
  tutionClassToUpdate.id = id;

  const tutionClassRepo = await getClassRepo();
  const teacherRepo = await getTeacherRepo();
  const gradeRepo = await getGradeRepo();
  const classTypeRepo = await getClassTypeRepo();
  const subjectRepo = await getSubjectRepo();
  // get the teacher
  const teacherOfClass = await teacherRepo.findOne(teacherId);

  // get grades
  const gradesOfClass: Grade[] = [];

  for (let i = 0; i < gradeIds.length; i++) {
    const gradeId = gradeIds[i];
    const grade = await gradeRepo.findOne(gradeId);
    gradesOfClass.push(grade as Grade);
  }

  // get subject
  const subjectOfClass = await subjectRepo.findOne(subjectId);

  // get tution class type
  const typeOfClass = await classTypeRepo.findOne(tutionClassTypeId);

  if (
    teacherOfClass === undefined ||
    typeOfClass === undefined ||
    subjectOfClass === undefined
  ) {
    // error
    return null;
  } else {
    tutionClassToUpdate.teacher = teacherOfClass;
    tutionClassToUpdate.grades = (gradesOfClass as any) as Grade[];
    tutionClassToUpdate.type = typeOfClass;
    tutionClassToUpdate.subject = subjectOfClass;

    await tutionClassRepo.save(tutionClassToUpdate);
    return tutionClassToUpdate;
  }
};

export const deleteTutionClass = async (id: number) => {
  const classRepo = await getClassRepo();

  const tutionClassToDelete: TutionClass = (await classRepo.findOne(id))!;
  await classRepo.remove(tutionClassToDelete);
  return;
};

export const createDefaultGrades = async () => {
  const repo = await getGradeRepo();

  if ((await repo.count()) !== 0) {
    // already has grades, so no need to insert again
    return;
  }
  const grades: Grade[] = [
    new Grade(1, 1),
    new Grade(2, 2),
    new Grade(3, 3),
    new Grade(4, 4),
    new Grade(5, 5),
    new Grade(6, 6),
    new Grade(7, 7),
    new Grade(8, 8),
    new Grade(9, 9),
    new Grade(10, 10),
    new Grade(11, 11),
    new Grade(12, 12),
    new Grade(13, 13)
  ];

  grades.forEach(async g => {
    await repo.save(g);
  });
};

export const createDefaultTeachers = async () => {
  const repo = await getTeacherRepo();

  if ((await repo.count()) !== 0) {
    return;
  }
  const teachers: Teacher[] = [
    new Teacher('Yalu', 'Karunarathna', ''),
    new Teacher('Malu', 'Kumari', ''),
    new Teacher('Lakmal', 'Samarasinghe', ''),
    new Teacher('Chandana', 'Bandara', '')
  ];

  teachers.forEach(async t => {
    await repo.save(t);
  });
};

export const getAllTeachers = async () => {
  const repo = await getTeacherRepo();

  const allTeachers = await repo.find({ relations: ['tutionClasses'] });

  return allTeachers;
};

export const getAllGrades = async () => {
  const repo = await getGradeRepo();

  const allGrades = await repo.find({ relations: ['tutionClasses'] });

  return allGrades;
};

export const createDefaultTutionClassTypes = async () => {
  const repo = await getClassTypeRepo();

  if ((await repo.count()) !== 0) {
    // already has the class types
    return;
  }

  const classTypes: TutionClassType[] = [
    new TutionClassType(1, 'regular'),
    new TutionClassType(2, 'paper'),
    new TutionClassType(3, 'revision')
  ];

  classTypes.forEach(async c => {
    await repo.save(c);
  });
};

export const getAllTutionClassTypes = async () => {
  const repo = await getClassTypeRepo();

  const allClassTypes = await repo.find({ relations: ['tutionClasses'] });

  return allClassTypes;
};

export const getAllTutionClasses = async () => {
  const repo = await getClassRepo();

  const allTutionClasses = await repo.find({
    relations: ['teacher', 'subject', 'grades', 'type']
  });

  return allTutionClasses;
};

export const getTutionClassById = async (
  id: number
): Promise<TutionClass | null> => {
  const tutionClassRepo = await getClassRepo();

  const tutionClass = (await tutionClassRepo.findOne(id)) || null;
  return tutionClass;
};
