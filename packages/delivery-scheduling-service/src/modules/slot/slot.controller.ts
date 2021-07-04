import { CreateSlotQueryDto } from './dtos/queries/create-slot-query.dto';
import { FastifyRequest } from 'fastify';
import { GetSlotsDto } from './dtos/results/get-slots.dto';
import { GetSlotsQueryDto } from './dtos/queries/get-slots-query.dto';
import { ISlotService } from './slot.service';
import { SlotDto } from './dtos/slot.dto';

class SlotController {
  constructor(
    private readonly slotService: ISlotService,
  ) {}

  getSlots = (request: FastifyRequest): Promise<GetSlotsDto> => {
    const query = request.query as GetSlotsQueryDto;

    return this.slotService.getSlots(query);
  }

  createSlot = (request: FastifyRequest): Promise<SlotDto> => {
    const body = request.body as CreateSlotQueryDto;

    return this.slotService.createSlot(body);
  }
}

export default SlotController;
