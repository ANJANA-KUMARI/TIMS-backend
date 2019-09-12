import { IDefaultDataLoader } from "../../utils/DefaultDataLoader";
import * as empService from "./employee.service";

export class DataLoader implements IDefaultDataLoader {
  async load(): Promise<void> {
    await empService.createDefaultEmployeeTypes();
  }
}
