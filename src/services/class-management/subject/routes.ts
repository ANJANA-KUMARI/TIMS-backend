import { Request, Response } from 'express';
import { HTTP403Error } from '../../../utils/httpErrors';

import logger from '../../../utils/logger';
import { handleError, HTTP_METHOD } from '../../../utils';
import { verifyJWTToken } from '../../../middleware/auth';

const API_PRE = '/subject';

export default [
  {
    path: `${API_PRE}/`,
    method: HTTP_METHOD.GET,
    handler: (req: Request, res: Response) => {
      try {
        res.status(200).send({ id: 1, name: 'maths' });
      } catch (error) {
        handleError(error, res);
      }
    }
  },
  {
    path: `${API_PRE}/`,
    method: HTTP_METHOD.POST,
    handler: (req: Request, res: Response) => {
      try {
        // TODO : create subject
        res.status(200).send({ id: 1, name: 'maths' });
      } catch (error) {
        handleError(error, res);
      }
    }
  }
];
