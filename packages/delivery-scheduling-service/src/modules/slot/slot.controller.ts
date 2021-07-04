import { FastifyRequest } from 'fastify';
import { GetSlotsQueryDto } from './dtos/queries/get-slots-query.dto';
import { GetSlotsDto } from './dtos/results/get-slots.dto';
import { ISlotService } from './slot.service';

class SlotController {
  constructor(
    private readonly slotService: ISlotService,
  ) {}

  getSlots = (request: FastifyRequest): Promise<GetSlotsDto> => {
    const query = request.query as GetSlotsQueryDto;

    return this.slotService.getSlots(query);
  }
}

export default SlotController;
