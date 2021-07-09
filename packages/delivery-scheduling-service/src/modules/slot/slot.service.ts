import { BookSlotMapper } from './mappers';
import { FindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { GetSlotsDto } from './dtos/results/get-slots.dto';
import { GetSlotsMapper } from './mappers/get-slots.mapper';
import { GetSlotsQueryDto } from './dtos/queries/get-slots-query.dto';
import { ISlotRepository } from './slot.repository';
import { Slot } from './entities/slot.entity';
import { SlotDto } from './dtos/slot.dto';
import { BookSlotQuery } from './entities/query/book-slot-query.entity';
import { BookSlot } from './dtos/queries/book-slot-query.dto';

export interface ISlotService {
  getSlots(queryDto: GetSlotsQueryDto): Promise<GetSlotsDto>;
  bookSlot(code: string, query: BookSlot): Promise<SlotDto | void>;
}

class SlotService implements ISlotService {
  constructor(
    private readonly slotRepository: ISlotRepository
  ) {}

  async getSlots(queryDto: GetSlotsQueryDto): Promise<GetSlotsDto> {
    const queryEntity: FindAllSlotsQuery = GetSlotsMapper.toDomain(queryDto);
    const slots: Slot[] = await this.slotRepository.findAllUpcoming(queryEntity);

    return GetSlotsMapper.toDTO(slots);
  }

  async bookSlot(code: string, queryDto: BookSlot): Promise<SlotDto | void> {
    const queryEntity: BookSlotQuery = BookSlotMapper.toDomain(code, queryDto);
    const result = await this.slotRepository.upsert(queryEntity);

    return result ? void BookSlotMapper.toDTO(result) : undefined;
  }
}

export default SlotService;
