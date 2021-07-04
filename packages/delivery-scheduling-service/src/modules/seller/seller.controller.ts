import { CreateSellerQueryDto } from './dtos/queries/create-seller-query.dto';
import { PartialUpdateSellerQueryDto } from './dtos/queries/partial-update-seller-query.dto';
import { SellerDto } from './dtos/seller.dto';
import { FastifyRequest } from 'fastify';
import { ISellerService } from './seller.service';
import { GetSellersDto } from './dtos/results/get-sellers.dto';

class SellerController {
  constructor(
    private readonly sellerService: ISellerService,
  ) {}

  getSellers = (): Promise<GetSellersDto> => {
    return this.sellerService.getSellers();
  }

  createSeller = (request: FastifyRequest): Promise<SellerDto> => {
    const body = request.body as CreateSellerQueryDto;

    return this.sellerService.createSeller(body);
  }

  partialUpdateSeller = (request: FastifyRequest): Promise<SellerDto> => {
    const { code } = request.params as { code: string };
    const body = request.body as PartialUpdateSellerQueryDto;

    return this.sellerService.partialUpdateSeller(code, body);
  }
}

export default SellerController;
