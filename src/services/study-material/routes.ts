import { Request, Response } from 'express';
import { HTTP403Error } from '../../utils/httpErrors';

import logger from '../../utils/logger';
import { handleError, HTTP_METHOD } from '../../utils';
import { verifyJWTToken } from '../../middleware/auth';
import path from 'path';

import upload from '../../utils/file-upload';
import * as studyMatController from './study-material.controller';
import config from '../../config';

const API_PRE = '/studymat';

export default [
  {
    path: `${API_PRE}/file/:file`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const file = decodeURIComponent(req.params.file);
        console.log('====================================');
        console.log(file);
        console.log('====================================');
        try {
          const fileLocation = path.join(
            config.app.studyMaterialUploadPath,
            file
          );
          res.download(fileLocation, file);
        } catch (deleteEr) {
          console.log(deleteEr);
          res.status(200).send({ deleted: false });
        }
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/:id?*`,
    method: HTTP_METHOD.GET,

    handler: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        if (id) {
          const subject = await studyMatController.getStudyMaterialById(id);
          res.status(200).send(subject);
        } else {
          const allStudyMaterials = await studyMatController.getAllStudyMaterials();
          res.status(200).send(allStudyMaterials);
        }
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/`,
    method: HTTP_METHOD.POST,
    handler: [
      upload.single('studymatfile'),
      async (req: Request, res: Response) => {
        try {
          const { description, tutionClassId } = req.body;
          const fileName = req.file.filename;
          const displayFileName = req.file.originalname;
          const insertedStudyMaterial = await studyMatController.createStudyMaterial(
            description,
            fileName,
            tutionClassId,
            displayFileName
          );
          res.status(200).send(insertedStudyMaterial);
        } catch (error) {
          handleError(error, res);
        }
      }
    ]
  },
  {
    path: `${API_PRE}/update`,
    method: HTTP_METHOD.POST,
    handler: async (req: Request, res: Response) => {
      try {
        const {
          id,
          description,
          filename,
          tutionClassId,
          displayFileName
        } = req.body;
        const updatedStudyMaterial = await studyMatController.updateStudyMaterial(
          id,
          description,
          filename,
          tutionClassId,
          displayFileName
        );
        res.status(200).send(updatedStudyMaterial);
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/delete`,
    method: HTTP_METHOD.POST,
    handler: async (req: Request, res: Response) => {
      try {
        const { idToDelete } = req.body;
        try {
          await studyMatController.deleteStudyMaterial(idToDelete);
          res.status(200).send({ deleted: true });
        } catch (deleteEr) {
          console.log(deleteEr);
          res.status(200).send({ deleted: false });
        }
      } catch (error) {
        handleError(error, res);
      }
    }
  }
];
