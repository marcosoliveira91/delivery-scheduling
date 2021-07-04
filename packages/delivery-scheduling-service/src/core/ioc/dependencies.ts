import Logger from '../../shared/logger/logger';
import SellerController from '../../modules/seller/seller.controller';
import SellerRepository from '../../modules/seller/seller.repository';
import SellerService from '../../modules/seller/seller.service';
import SlotController from '../../modules/slot/slot.controller';
import SlotRepository from '../../modules/slot/slot.repository';
import SlotService from '../../modules/slot/slot.service';
import { ClassDependencies } from './types/index';
import { Server } from '../server';

const logger = Logger.getInstance();

const dependencies: ClassDependencies[] = [
  {
    clss: SellerController,
    dependencies: ['ISellerService'],
  },
  {
    clss: SlotController,
    dependencies: ['ISlotService'],
  },
  {
    clss: ['ISellerService', SellerService],
    dependencies: ['ISellerRepository'],
  },
  {
    clss: ['ISlotService', SlotService],
    dependencies: ['ISlotRepository'],
  },
  {
    clss: ['ISellerRepository', SellerRepository],
    dependencies: ['ILogger'],
  },
  {
    clss: ['ISlotRepository', SlotRepository],
    dependencies: ['ILogger'],
  },
  {
    constant: ['ILogger', logger],
  },
];

export default dependencies;
