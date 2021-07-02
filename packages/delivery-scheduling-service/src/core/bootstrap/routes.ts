// import * as schemas from '../schemas';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';

export class Routes {
  static bootstrap(_server: Server, _container: IocContainer): void {
    // const sellerController: SellerController = container.get(SellerController);

    // server.setRoute('get', '/sellers/:code', sellersController.getSeller, { schema: schemas.getPellerSchema });
    // server.setRoute('get', '/sellers/:code', Promise.resolve({}) as any);
  }
}
