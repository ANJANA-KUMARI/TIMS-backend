import { Request, Response } from 'express';
import { HTTP403Error } from '../../../utils/httpErrors';

import logger from '../../../utils/logger';
import { handleError, HTTP_METHOD } from '../../../utils';
import { verifyJWTToken } from '../../../middleware/auth';

import * as subjectController from './subject.controller';

const API_PRE = '/subject';

export default [
  {
    path: `${API_PRE}/:id?*`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        if (id) {
          const subject = await subjectController.getSubjectById(id);
          res.status(200).send(subject);
        } else {
          const allSubjects = await subjectController.getAllSubjects();
          res.status(200).send(allSubjects);
        }
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/`,
    method: HTTP_METHOD.POST,
    handler: async (req: Request, res: Response) => {
      try {
        const { name, color } = req.body;
        const insertedSubject = await subjectController.createSubject(
          name,
          color
        );
        res.status(200).send(insertedSubject);
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/update`,
    method: HTTP_METHOD.POST,
    handler: async (req: Request, res: Response) => {
      try {
        const { id, name, color } = req.body;
        const updatedSubject = await subjectController.updateSubject(
          id,
          name,
          color
        );
        res.status(200).send(updatedSubject);
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
          await subjectController.deleteSubject(idToDelete);
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
