import { CreateSellerQueryDto } from './dtos/queries/create-seller-query.dto';
import { CreateSellerResultDto } from './dtos/results/create-seller-result.dto';
import { FastifyRequest } from 'fastify';
import { ISellerService } from './seller.service';

class SellerController {
  constructor(
    private readonly sellerService: ISellerService,
  ) {}

  createSeller = (request: FastifyRequest): Promise<CreateSellerResultDto> => {
    const body = request.body as CreateSellerQueryDto;

    return this.sellerService.createSeller(body);
  }
}

export default SellerController;
