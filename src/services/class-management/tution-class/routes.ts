import { Request, Response } from "express";
import { HTTP403Error } from "../../../utils/httpErrors";

import logger from "../../../utils/logger";
import { handleError, HTTP_METHOD } from "../../../utils";
import { verifyJWTToken } from "../../../middleware/auth";

import * as tutionClassController from "./tution-class.controller";
import { log } from "util";

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
  },

  {
    path: `${API_PRE}/:id?*`,
    method: HTTP_METHOD.GET,
    handler: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        if (id) {
          const tutionClass = await tutionClassController.getTutionClassById(
            id
          );
          res.status(200).send(tutionClass);
        } else {
          const allTutionClasses = await tutionClassController.getAllTutionClasses();
          res.status(200).send(allTutionClasses);
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
          venue,
          date,
          startTime,
          endTime,
          teacher,
          grades,
          type,
          subject
        } = req.body;
        console.log("====================================");
        console.log(req.body);
        console.log("====================================");
        const insertedTutionClass = await tutionClassController.createTutionClass(
          venue,
          date,
          startTime,
          endTime,
          teacher,
          grades,
          type,
          subject
        );
        res.status(200).send(insertedTutionClass);
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
          venue,
          date,
          startTime,
          endTime,
          teacherId,
          gradeIds,
          tutionClassTypeId,
          subjectId
        } = req.body;
        const updatedTutionClass = await tutionClassController.updateTutionClass(
          id,
          venue,
          date,
          startTime,
          endTime,
          teacherId,
          gradeIds,
          tutionClassTypeId,
          subjectId
        );
        res.status(200).send(updatedTutionClass);
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
          await tutionClassController.deleteTutionClass(idToDelete);
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
