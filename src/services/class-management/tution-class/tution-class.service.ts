import dbCon from '../../../utils/db';
import { TutionClass } from './entities/tution-class.entity';
import { TutionClassType } from './entities/tution-class-type.entity';
import { Grade } from './entities/grade.entity';

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

export const createClass = async () => {};

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
