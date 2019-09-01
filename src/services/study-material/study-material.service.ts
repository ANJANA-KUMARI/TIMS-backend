import dbCon from '../../utils/db';
import { Connection } from 'typeorm';
import { StudyMaterial } from './study-material.entity';
import { TutionClass } from '../class-management/tution-class/entities/tution-class.entity';

let con: Connection;

const getStudyMaterialRepo = async () => {
  con = await dbCon;
  const repo = con.getRepository(StudyMaterial);
  return repo;
};

const getTutionClassRepo = async () => {
  con = await dbCon;
  const repo = con.getRepository(TutionClass);
  return repo;
};

export const createStudyMaterial = async (
  description: string,
  fileName: string,
  tutionClassId: number,
  displayFName: string
): Promise<StudyMaterial> => {
  let studyMaterial = new StudyMaterial(description, fileName, displayFName);

  const studyMaterialRepo = await getStudyMaterialRepo();
  const tutionClassRepo = await getTutionClassRepo();

  const tutionClass = await tutionClassRepo.findOne(tutionClassId);
  studyMaterial.tutionClass = tutionClass as TutionClass;

  await studyMaterialRepo.save(studyMaterial);

  return studyMaterial;
};

export const getAllStudyMaterials = async (): Promise<StudyMaterial[]> => {
  const studyMaterialRepo = await getStudyMaterialRepo();

  const allStudyMaterials = await studyMaterialRepo.find({
    relations: [
      'tutionClass',
      'tutionClass.subject',
      'tutionClass.grades',
      'tutionClass.teacher',
      'tutionClass.type'
    ]
  });
  return allStudyMaterials;
};

export const getStudyMaterialById = async (
  id: number
): Promise<StudyMaterial | null> => {
  const studyMaterialRepo = await getStudyMaterialRepo();

  const studyMaterial =
    (await studyMaterialRepo.findOne(id, { relations: ['tutionClass'] })) ||
    null;
  return studyMaterial;
};

export const updateStudyMaterial = async (
  id: number,
  description: string,
  fileName: string,
  tutionClassId: number,
  displayFName: string
): Promise<StudyMaterial> => {
  const studyMaterialRepo = await getStudyMaterialRepo();
  const tutionClassRepo = await getTutionClassRepo();

  const studyMaterialToUpdate = new StudyMaterial(
    description,
    fileName,
    displayFName
  );
  studyMaterialToUpdate.id = id;
  studyMaterialToUpdate.tutionClass = (await tutionClassRepo.findOne(
    tutionClassId
  )) as TutionClass;

  await studyMaterialRepo.save(studyMaterialToUpdate);
  return studyMaterialToUpdate;
};

export const deleteStudyMaterial = async (id: number) => {
  const studyMaterialRepo = await getStudyMaterialRepo();

  const studyMaterialToDelete: StudyMaterial = (await studyMaterialRepo.findOne(
    id
  ))!;
  await studyMaterialRepo.remove(studyMaterialToDelete);
  return;
};
