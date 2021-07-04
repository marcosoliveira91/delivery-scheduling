import ILogger from '../../shared/logger/logger.interface';
import { FindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { Slot } from './entities/slot.entity';

export interface ISlotRepository {
  create(query: Slot): Slot;
  findAll(query: FindAllSlotsQuery): Slot[];
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

  create(query: Slot): Slot {
    try {
      // TODO: implement call to db
      if(mockSlots.find(slot => slot.code === query.code)) {
        throw new Error('Slot resource already exists');
      }

      mockSlots.push(query);
      const result = mockSlots.find(slot => slot.code === query.code) ?? {} as Slot;

      return result;
    } catch (error) {
      this.logger.error({
        message: 'Error in SlotRepository.create',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }

  findAll(query: FindAllSlotsQuery) : Slot[] {
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
