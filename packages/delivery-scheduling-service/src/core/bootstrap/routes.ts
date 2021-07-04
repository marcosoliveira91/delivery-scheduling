import * as sellerSchemas from '../../modules/seller/schemas';
import * as slotSchemas from '../../modules/slot/schemas';
import SellerController from '../../modules/seller/seller.controller';
import SlotController from '../../modules/slot/slot.controller';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';

export class Routes {
  static bootstrap(server: Server, container: IocContainer): void {
    const sellerController = container.get(SellerController);
    const slotController = container.get(SlotController);

    server.setRoute('get', '/sellers', sellerController.getSellers, { schema: sellerSchemas.getSellersSchema });
    server.setRoute('post', '/sellers', sellerController.createSeller, { schema: sellerSchemas.createSellerSchema });
    server.setRoute('patch', '/sellers/:code', sellerController.partialUpdateSeller, { schema: sellerSchemas.partialUpdateSellerSchema });

    server.setRoute('get', '/slots', slotController.getSlots, { schema: slotSchemas.getSlotsSchema });
    server.setRoute('post', '/slots', slotController.createSlot, { schema: slotSchemas.createSlotSchema });
  }
}
