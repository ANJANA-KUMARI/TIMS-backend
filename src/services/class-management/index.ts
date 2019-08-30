import subjectRoutes from "./subject/routes";
import tutionClassRoutes from "./tution-class/routes";
import { DataLoader } from "./DataLoader";

export default [...subjectRoutes, ...tutionClassRoutes];

export const ClassMngDataLoader = new DataLoader();
