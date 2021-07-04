import { CreateSlotMapper, BookSlotMapper } from './mappers';
import { CreateSlotQueryDto } from './dtos/queries/create-slot-query.dto';
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
  createSlot(query: CreateSlotQueryDto): Promise<SlotDto>;
  bookSlot(code: string, query: BookSlot): Promise<SlotDto | void>;
}

class SlotService implements ISlotService {
  constructor(
    private readonly slotRepository: ISlotRepository
  ) {}

  async getSlots(queryDto: GetSlotsQueryDto): Promise<GetSlotsDto> {
    const queryEntity: FindAllSlotsQuery = GetSlotsMapper.toDomain(queryDto);
    const slots: Slot[] = this.slotRepository.findAll(queryEntity);

    return Promise.resolve(GetSlotsMapper.toDTO(slots));
  }

  async createSlot(queryDto: CreateSlotQueryDto): Promise<SlotDto> {
    const queryEntity: Slot = CreateSlotMapper.toDomain(queryDto);
    const slot: Slot = this.slotRepository.create(queryEntity);

    return Promise.resolve(CreateSlotMapper.toDTO(slot));
  }

  async bookSlot(code: string, queryDto: BookSlot): Promise<SlotDto | void> {
    const queryEntity: BookSlotQuery = BookSlotMapper.toDomain(code, queryDto);
    const result = this.slotRepository.createOrUpdate(queryEntity);

    return Promise.resolve(result ? CreateSlotMapper.toDTO(result) : undefined);
  }
}

export default SlotService;
