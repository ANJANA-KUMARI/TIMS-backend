import { Request, Response } from "express";
import { HTTP403Error } from "../../../utils/httpErrors";

import logger from "../../../utils/logger";
import { handleError, HTTP_METHOD } from "../../../utils";
import { verifyJWTToken } from "../../../middleware/auth";

import * as tutionClassController from "./tution-class.controller";

const API_PRE = "/tution-class";

export default [
  {
    path: `${API_PRE}/grade`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const allGrades = await tutionClassController.getAllGrades();
        res.status(200).send(allGrades);
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/type`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const allTypes = await tutionClassController.getAllTypes();
        res.status(200).send(allTypes);
      } catch (error) {
        handleError(error, res);
      }
    }
  },

  {
    path: `${API_PRE}/teacher`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const allTeachers = await tutionClassController.getAllTeachers();
        res.status(200).send(allTeachers);
      } catch (error) {
        handleError(error, res);
      }
    }
  }
];
