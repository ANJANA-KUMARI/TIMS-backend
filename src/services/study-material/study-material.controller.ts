import * as studyMatService from './study-material.service';

export const createStudyMaterial = async (
  description: string,
  file: string,
  tutionClassId: number,
  displayFName: string
) => {
  const insertedStudyMaterial = await studyMatService.createStudyMaterial(
    description,
    file,
    tutionClassId,
    displayFName
  );
  return insertedStudyMaterial;
};

export const getAllStudyMaterials = async () => {
  const allStudyMaterials = await studyMatService.getAllStudyMaterials();
  return allStudyMaterials;
};

export const getStudyMaterialById = async (id: number) => {
  const studyMaterial = await studyMatService.getStudyMaterialById(id);
  return studyMaterial;
};

export const deleteStudyMaterial = async (studyMaterialId: number) => {
  await studyMatService.deleteStudyMaterial(studyMaterialId);
};

export const updateStudyMaterial = async (
  studyMaterialId: number,
  description: string,
  file: string,
  tutionClassId: number,
  displayFName: string
) => {
  const updatedStudyMaterial = await studyMatService.updateStudyMaterial(
    studyMaterialId,
    description,
    file,
    tutionClassId,
    displayFName
  );
  return updatedStudyMaterial;
};
