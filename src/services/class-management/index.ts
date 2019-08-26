import featureRoutes from './subject/routes';
import { DataLoader } from './DataLoader';

export default [...featureRoutes];

export const ClassMngDataLoader = new DataLoader();
