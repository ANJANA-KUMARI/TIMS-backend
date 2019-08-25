import logger from '../logger';
import config from '../../config';
import { createConnection } from 'typeorm';
import { Subject } from '../../services/class-management/subject/subject.entity';

const connection = createConnection({
  type: 'mysql',
  host: config.database.uri,
  port: 3306,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [Subject],
  synchronize: true
});

export default connection;
