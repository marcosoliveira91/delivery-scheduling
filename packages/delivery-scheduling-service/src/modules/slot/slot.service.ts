import { CreateSlotMapper } from './mappers';
import { CreateSlotQueryDto } from './dtos/queries/create-slot-query.dto';
import { GetSlotsDto } from './dtos/results/get-slots.dto';
import { GetSlotsMapper } from './mappers/get-slots.mapper';
import { GetSlotsQueryDto } from './dtos/queries/get-slots-query.dto';
import { FindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { ISlotRepository } from './slot.repository';
import { Slot } from './entities/slot.entity';
import { SlotDto } from './dtos/slot.dto';

export interface ISlotService {
  getSlots(queryDto: GetSlotsQueryDto): Promise<GetSlotsDto>;
  createSlot(query: CreateSlotQueryDto): Promise<SlotDto>;
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
}

export default SlotService;
