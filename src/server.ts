import dotenv, { config } from 'dotenv';
import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import classManagementRoutes from './services/class-management';
import studyMaterialRoutes from './services/study-material';
import { ClassMngDataLoader } from './services/class-management/';

dotenv.config();

import logger from './utils/logger';
import { loadDefaultData } from './utils/DefaultDataLoader';

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});

const router = express();

const API_PREFIX = '/v1';

// db
require('./utils/db');

// Common middleware
applyMiddleware(middleware, router);
// Error handling middleware
applyMiddleware(errorHandlers, router);

// load default data
loadDefaultData([ClassMngDataLoader]);

// Routes

applyRoutes(classManagementRoutes, router, `${API_PREFIX}`);
applyRoutes(studyMaterialRoutes, router, `${API_PREFIX}`);

const { PORT = 5000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  logger.info(`Server is running http://localhost:${PORT}...`)
);
