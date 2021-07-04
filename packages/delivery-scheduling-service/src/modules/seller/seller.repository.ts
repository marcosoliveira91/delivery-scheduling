import ILogger from '../../shared/logger/logger.interface';
import { PartialUpdateSellerQuery as PartialUpdateSellerQueryEntity } from './entities/queries/partial-update-seller-query.entity';
import { Seller } from './entities/seller.entity';

export interface ISellerRepository {
  create(query: Seller): Seller;
  findAll(): Seller[];
  partialUpdate(query: PartialUpdateSellerQueryEntity): Seller;
}

const mockSellers = [{
  'code': '41YPMX30G4',
  'name': 'Pingo Doce',
  'openingHours': [
    {
      'weekDay': 'MON',
      'startTime': '08:00',
      'endTime': '19:00',
    },
    {
      'weekDay': 'TUE',
      'startTime': '08:00',
      'endTime': '19:00',
    },
    {
      'weekDay': 'WED',
      'startTime': '08:00',
      'endTime': '19:00',
    },
    {
      'weekDay': 'THU',
      'startTime': '08:00',
      'endTime': '19:00',
    },
    {
      'weekDay': 'FRI',
      'startTime': '08:00',
      'endTime': '19:00',
    },
  ],
}];

class SellerRepository implements ISellerRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  create(query: Seller): Seller {
    try {
      // TODO: implement call to db
      if(mockSellers.find(seller => seller.name === query.name)) {
        throw new Error('Seller resource already exists');
      }

      mockSellers.push(query);
      const result = mockSellers.find(seller => seller.code === query.code) ?? {} as Seller;

      return result;
    } catch (error) {
      this.logger.error({
        message: 'Error in SellerRepository.create',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }

  findAll() : Seller[] {
    try {
      return mockSellers ?? [];
    } catch (error) {
      this.logger.error({
        message: 'Error in SellerRepository.findAll',
        data: {},
        error: error as Error,
      });

      throw error;
    }
  }

  partialUpdate(query: PartialUpdateSellerQueryEntity): Seller {
    try {
      // TODO: implement call to db
      const sellerFound = mockSellers.find(seller => seller.code === query.code);

      if(!sellerFound) {
        throw new Error(`Seller ${query.code} not found`);
      }

      const result: Seller = {
        code: query.code,
        name: query.name ?? sellerFound.name,
        openingHours: query.openingHours ?? sellerFound.openingHours,
      };

      return result;
    } catch (error) {
      this.logger.error({
        message: 'Error in SellerRepository.partialUpdate',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default SellerRepository;
