import ILogger from '../../shared/logger/logger.interface';
import { PartialUpdateSellerQuery as PartialUpdateSellerQueryEntity } from './entities/queries/partial-update-seller-query.entity';
import { Seller } from './entities/seller.entity';
import { SellerDAO } from '../../shared/database/mongoose/models/seller.dao';

export interface ISellerRepository {
  create(query: Seller): Promise<Seller>;
  findAll(): Promise<Seller[]>;
  partialUpdate(query: PartialUpdateSellerQueryEntity): Promise<Seller>;
}

class SellerRepository implements ISellerRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async create(query: Seller): Promise<Seller> {
    try {
      const found = await SellerDAO.findOne({ code: query.code }).lean();

      if (found) {
        throw new Error('Seller resource already exists');
      }

      const newSeller = new SellerDAO(query);
      const created = await newSeller.save();

      return created ?? {};
    } catch (error) {
      this.logger.error({
        message: 'Error in SellerRepository.create',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }

  async findAll() : Promise<Seller[]> {
    try {
      const all = await SellerDAO.find().lean() ?? [];

      return all;
    } catch (error) {
      this.logger.error({
        message: 'Error in SellerRepository.findAll',
        data: {},
        error: error as Error,
      });

      throw error;
    }
  }

  async partialUpdate(query: PartialUpdateSellerQueryEntity): Promise<Seller> {
    try {
      const { code, ...fields } = query;
      const conditions = { code };
      const toUpdate = { ...fields };
      const withOptions = {
        new: true,
      };

      const updated = await SellerDAO.findOneAndUpdate(conditions, toUpdate, withOptions).lean();

      if(!updated) {
        throw new Error(`Seller ${query.code} not found`);
      }

      return updated;
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
