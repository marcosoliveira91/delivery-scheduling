import ILogger from '../../shared/logger/logger.interface';
import { CreateSellerQuery as CreateSellerQueryEntity } from './entities/queries/create-seller-query.entity';
import { Seller } from './entities/seller.entity';

export interface ISellerRepository {
  createSeller(query: CreateSellerQueryEntity): Seller;
}

class SellerRepository implements ISellerRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  createSeller(query: CreateSellerQueryEntity): Seller {
    try {
      // TODO: implement this
      const mockResult = {
        ...query,
      } as Seller;

      return mockResult;
    } catch (error) {
      this.logger.error({
        message: 'Error in SellerRepository.createSeller',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default SellerRepository;
