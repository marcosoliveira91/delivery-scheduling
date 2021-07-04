import { CreateSellerMapper, GetSellersMapper, PartialUpdateSellerMapper } from './mappers';
import { CreateSellerQueryDto } from './dtos/queries/create-seller-query.dto';
import { ISellerRepository } from './seller.repository';
import { PartialUpdateSellerQuery } from './entities/queries/partial-update-seller-query.entity';
import { PartialUpdateSellerQueryDto } from './dtos/queries/partial-update-seller-query.dto';
import { Seller } from './entities/seller.entity';
import { ISellerDto } from './dtos/seller.dto';
import { IGetSellersDto } from './dtos/results/get-sellers.dto';

export interface ISellerService {
  getSellers(): Promise<IGetSellersDto>;
  createSeller(query: CreateSellerQueryDto): Promise<ISellerDto>;
  partialUpdateSeller(code: string, query: PartialUpdateSellerQueryDto): Promise<ISellerDto>;
}

class SellerService implements ISellerService {
  constructor(
    private readonly sellerRepository: ISellerRepository
  ) {}

  async getSellers(): Promise<IGetSellersDto> {
    const sellers: Seller[] = this.sellerRepository.findAll();

    return Promise.resolve(GetSellersMapper.toDTO(sellers));
  }

  async createSeller(queryDto: CreateSellerQueryDto): Promise<ISellerDto> {
    const queryEntity: Seller = CreateSellerMapper.toDomain(queryDto);
    const seller: Seller = this.sellerRepository.create(queryEntity);

    return Promise.resolve(CreateSellerMapper.toDTO(seller));
  }

  async partialUpdateSeller(code: string, queryDto: PartialUpdateSellerQueryDto): Promise<ISellerDto> {
    const queryEntity: PartialUpdateSellerQuery = PartialUpdateSellerMapper.toDomain(code, queryDto);
    const seller: Seller = this.sellerRepository.partialUpdate(queryEntity);

    return Promise.resolve(PartialUpdateSellerMapper.toDTO(seller));
  }
}

export default SellerService;
