import Logger from '../../shared/logger/logger';
import SellerController from '../../modules/seller/seller.controller';
import SellerRepository from '../../modules/seller/seller.repository';
import SellerService from '../../modules/seller/seller.service';
import { ClassDependencies } from './types/index';

const logger = Logger.getInstance();

const dependencies: ClassDependencies[] = [
  {
    clss: SellerController,
    dependencies: ['ISellerService'],
  },
  {
    clss: ['ISellerService', SellerService],
    dependencies: ['ISellerRepository'],
  },
  {
    clss: ['ISellerRepository', SellerRepository],
    dependencies: ['ILogger'],
  },
  {
    constant: ['ILogger', logger],
  },
];

export default dependencies;
