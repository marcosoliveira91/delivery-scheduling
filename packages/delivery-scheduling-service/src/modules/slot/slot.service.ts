import { GetSlotsMapper } from './mappers/get-slots.mapper';
import { GetSlotsQueryDto } from './dtos/queries/get-slots-query.dto';
import { IFindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { GetSlotsDto } from './dtos/results/get-slots.dto';
import { ISlotRepository } from './slot.repository';
import { Slot } from './entities/slot.entity';

export interface ISlotService {
  getSlots(queryDto: GetSlotsQueryDto): Promise<GetSlotsDto>;
}

class SlotService implements ISlotService {
  constructor(
    private readonly slotRepository: ISlotRepository
  ) {}

  async getSlots(queryDto: GetSlotsQueryDto): Promise<GetSlotsDto> {
    const queryEntity: IFindAllSlotsQuery = GetSlotsMapper.toDomain(queryDto);
    const slots: Slot[] = this.slotRepository.findAll(queryEntity);

    return Promise.resolve(GetSlotsMapper.toDTO(slots));
  }
}

export default SlotService;
