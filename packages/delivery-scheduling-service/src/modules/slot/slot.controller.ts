import { FastifyReply, FastifyRequest } from 'fastify';
import { GetSlotsDto } from './dtos/results/get-slots.dto';
import { GetSlotsQueryDto } from './dtos/queries/get-slots-query.dto';
import { ISlotService } from './slot.service';
import { SlotDto } from './dtos/slot.dto';
import { BookSlot } from './dtos/queries/book-slot-query.dto';

class SlotController {
  constructor(
    private readonly slotService: ISlotService,
  ) {}

  getSlots = (request: FastifyRequest): Promise<GetSlotsDto> => {
    const query = request.query as GetSlotsQueryDto;

    return this.slotService.getSlots(query);
  }

  bookSlot = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<SlotDto | void> => {
    const { code } = request.params as { code: string };
    const body = request.body as BookSlot;

    const result = await this.slotService.bookSlot(code, body);

    if(result) {
      return reply.code(201).send(result);
    }

    return reply.send();
  }
}

export default SlotController;
