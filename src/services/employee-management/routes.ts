import { Request, Response } from 'express';
import { HTTP403Error } from '../../utils/httpErrors';

import logger from '../../utils/logger';
import { handleError, HTTP_METHOD } from '../../utils';
import { verifyJWTToken } from '../../middleware/auth';

import * as employeeController from './employee.controller';

const API_PRE = '/employee';

export default [
  {
    path: `${API_PRE}/:id?*`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        if (id) {
          const employee = await employeeController.getEmployeeById(id);
          res.status(200).send(employee);
        } else {
          const allEmployees = await employeeController.getAllEmployees();
          res.status(200).send(allEmployees);
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
          subject
        } = req.body;
        const insertedEmployee = await employeeController.createEmployee(
          firstName,
          lastName,
          email,
          phone,
          address,
          subject
        );
        res.status(200).send(insertedEmployee);
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
          subject
        } = req.body;
        const updatedEmployee = await employeeController.updateEmployee(
          id,
          firstName,
          lastName,
          email,
          address,
          phone,
          subject
        );
        res.status(200).send(updatedEmployee);
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
          await employeeController.deleteEmployee(idToDelete);
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
