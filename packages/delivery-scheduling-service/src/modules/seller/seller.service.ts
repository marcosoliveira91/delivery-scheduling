import { CreateSellerMapper, PartialUpdateSellerMapper } from './mappers';
import { CreateSellerQueryDto } from './dtos/queries/create-seller-query.dto';
import { ISellerRepository } from './seller.repository';
import { PartialUpdateSellerQuery } from './entities/queries/partial-update-seller-query.entity';
import { PartialUpdateSellerQueryDto } from './dtos/queries/partial-update-seller-query.dto';
import { Seller } from './entities/seller.entity';
import { SellerDto } from './dtos/seller.dto';

export interface ISellerService {
  createSeller(query: CreateSellerQueryDto): Promise<SellerDto>;
  partialUpdateSeller(code: string, query: PartialUpdateSellerQueryDto): Promise<SellerDto>;
}

class SellerService implements ISellerService {
  constructor(
    private readonly sellerRepository: ISellerRepository
  ) {}

  async createSeller(queryDto: CreateSellerQueryDto): Promise<SellerDto> {
    const queryEntity: Seller = CreateSellerMapper.toDomain(queryDto);
    const seller: Seller = this.sellerRepository.createSeller(queryEntity);

    return Promise.resolve(CreateSellerMapper.toDTO(seller));
  }

  async partialUpdateSeller(code: string, queryDto: PartialUpdateSellerQueryDto): Promise<SellerDto> {
    const queryEntity: PartialUpdateSellerQuery = PartialUpdateSellerMapper.toDomain(code, queryDto);
    const seller: Seller = this.sellerRepository.partialUpdateSeller(queryEntity);

    return Promise.resolve(PartialUpdateSellerMapper.toDTO(seller));
  }
}

export default SellerService;
