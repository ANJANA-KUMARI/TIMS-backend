import logger from '../logger';
import config from '../../config';
import { createConnection } from 'typeorm';
import { Subject } from '../../services/class-management/subject/subject.entity';
import { Grade } from '../../services/class-management/tution-class/entities/grade.entity';
import { TutionClassType } from '../../services/class-management/tution-class/entities/tution-class-type.entity';
import { TutionClass } from '../../services/class-management/tution-class/entities/tution-class.entity';
import { Teacher } from '../../services/class-management/tution-class/entities/teacher.entity';
import { StudyMaterial } from '../../services/study-material/study-material.entity';
import { Employee } from '../../services/employee-management/employee.entity';
import { Student } from '../../services/student-management/student.entity';

const connection = createConnection({
  type: 'mysql',
  host: config.database.uri,
  port: 3306,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [
    Subject,
    TutionClass,
    Grade,
    TutionClassType,
    Teacher,
    StudyMaterial,
    Employee,
    Student
  ],
  synchronize: true
});

export default connection;
