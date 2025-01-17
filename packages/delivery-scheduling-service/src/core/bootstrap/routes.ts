import * as sellerSchemas from '../../modules/seller/routes-schemas';
import * as slotSchemas from '../../modules/slot/routes-schemas';
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
    server.setRoute('put', '/slots/:code/book', slotController.bookSlot, { schema: slotSchemas.bookSlotSchema });
    // server.setRoute('delete', '/slots/:code/book', slotController.cancelBookSlotState, { schema: slotSchemas.cancelBookSlotSchema });
  }
}
