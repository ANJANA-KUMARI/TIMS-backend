import employeeRoutes from "./routes";
import { DataLoader } from "./DataLoader";

export default [...employeeRoutes];

export const empDataLoader = new DataLoader();
