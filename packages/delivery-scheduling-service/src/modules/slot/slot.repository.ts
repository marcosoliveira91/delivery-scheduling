import ILogger from '../../shared/logger/logger.interface';
import { IFindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { Slot } from './entities/slot.entity';

export interface ISlotRepository {
  findAll(query: IFindAllSlotsQuery): Slot[];
}

// TODO: replace mock data
const mockSlots: Slot[] = [{
  sellerCode: '41YPMX30G4',
  code: '41YPMX30G4-202107051030',
  status: 'AVAILABLE',
  startDate: '2021-07-05T10:30:00Z',
  endDate: '2021-07-05T11:30:00Z',
  duration: {
    raw: 30,
    unit: 'MIN',
  },
  capacity: {
    original: 2,
    current: 1,
  },
}];

class SlotRepository implements ISlotRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  findAll(query: IFindAllSlotsQuery) : Slot[] {
    try {
      const sellerSlots: Slot[] = mockSlots.filter(slot => slot.sellerCode === query.sellerCode);

      return sellerSlots ?? [] as Slot[];
    } catch (error) {
      this.logger.error({
        message: 'Error in SlotRepository.findAll',
        data: {},
        error: error as Error,
      });

      throw error;
    }
  }
}

export default SlotRepository;
