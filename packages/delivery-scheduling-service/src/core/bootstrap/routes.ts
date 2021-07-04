import * as sellerSchemas from '../../modules/seller/schemas';
import SellerController from '../../modules/seller/seller.controller';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';

export class Routes {
  static bootstrap(server: Server, container: IocContainer): void {
    const sellerController = container.get(SellerController);

    server.setRoute('get', '/sellers', sellerController.getSellers, { schema: sellerSchemas.getSellersSchema });
    server.setRoute('post', '/sellers', sellerController.createSeller, { schema: sellerSchemas.createSellerSchema });
    server.setRoute('patch', '/sellers/:code', sellerController.partialUpdateSeller, { schema: sellerSchemas.partialUpdateSellerSchema });
  }
}
