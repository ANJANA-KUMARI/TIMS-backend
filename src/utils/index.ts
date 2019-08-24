import { Router, Request, Response, NextFunction } from 'express';
import { HTTP403Error, HTTP401Error } from './httpErrors';
import logger from './logger';
import bcrypt from 'bcrypt';

type Wrapper = (router: Router) => void;

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PATCH: 'patch'
};

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  for (const f of middleware) {
    f(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (
  routes: Route[],
  router: Router,
  pathPrefix: string
) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](`${pathPrefix}${path}`, handler);
  }
};

export const handleError = (err: Error, res: Response) => {
  logger.error(err.message);
  if (err instanceof HTTP403Error) {
    res.status(403).send(err.message);
    return;
  } else if (err instanceof HTTP401Error) {
    res.status(401).send(err.message);
    return;
  }

  res.status(500).send(err.message);
};

export const validatePassword = async (
  origPassword: string,
  password: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, origPassword);
};
