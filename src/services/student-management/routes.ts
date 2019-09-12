import { Request, Response } from 'express';
import { HTTP403Error } from '../../utils/httpErrors';

import logger from '../../utils/logger';
import { handleError, HTTP_METHOD } from '../../utils';
import { verifyJWTToken } from '../../middleware/auth';

import * as studentController from './student.controller';

const API_PRE = '/student';

export default [
  {
    path: `${API_PRE}/:id?*`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        if (id) {
          const student = await studentController.getStudentById(id);
          res.status(200).send(student);
        } else {
          const allStudents = await studentController.getAllStudents();
          res.status(200).send(allStudents);
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
        const {
          firstName,
          lastName,
          email,
          address,
          phone,
          tutionClasses
        } = req.body;
        const insertedStudent = await studentController.createStudent(
          firstName,
          lastName,
          email,
          phone,
          address,
          tutionClasses
        );
        res.status(200).send(insertedStudent);
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
        const {
          id,
          firstName,
          lastName,
          email,
          address,
          phone,
          tutionClasses
        } = req.body;
        const updatedStudent = await studentController.updateStudent(
          id,
          firstName,
          lastName,
          email,
          address,
          phone,
          tutionClasses
        );
        res.status(200).send(updatedStudent);
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
          await studentController.deleteStudent(idToDelete);
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
