import { CreateSellerQueryDto } from './dtos/queries/create-seller-query.dto';
import { CreateSellerResultDto } from './dtos/results/create-seller-result.dto';
import { ISellerRepository } from './seller.repository';
import { Seller } from './entities/seller.entity';
import { CreateSellerMapper } from './mappers';

export interface ISellerService {
  createSeller(query: CreateSellerQueryDto): Promise<CreateSellerResultDto>;
}

class SellerService implements ISellerService {
  constructor(
    private readonly sellerRepository: ISellerRepository
  ) {}

  async createSeller(queryDto: CreateSellerQueryDto): Promise<CreateSellerResultDto> {
    const queryEntity: Seller = CreateSellerMapper.toDomain(queryDto);
    const seller: Seller = this.sellerRepository.createSeller(queryEntity);

    return Promise.resolve(CreateSellerMapper.toDTO(seller));
  }
}

export default SellerService;
