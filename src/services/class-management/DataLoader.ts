import { IDefaultDataLoader } from '../../utils/DefaultDataLoader';
import * as classService from './tution-class/tution-class.service';

export class DataLoader implements IDefaultDataLoader {
  async load(): Promise<void> {
    await classService.createDefaultGrades();
    await classService.createDefaultTutionClassTypes();
  }
}
