import Logger from '../../shared/logger/logger';
import { ClassDependencies } from './types';
// import config from '../../config';

const logger = Logger.getInstance();

const dependencies: ClassDependencies[] = [
  {
    constant: ['ILogger', logger],
  },
];

export default dependencies;
