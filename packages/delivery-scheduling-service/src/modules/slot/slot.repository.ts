import config from '../../config';
import ILogger from '../../shared/logger/logger.interface';
import { BookSlotQuery } from './entities/query/book-slot-query.entity';
import { FindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { RRule, RRuleSet } from 'rrule';
import { SellerDAO, SlotDAO } from '../../shared/database/mongoose/models';
import { Slot } from './entities/slot.entity';
import * as utils from '../../shared/utils';

export interface ISlotRepository {
  create(query: Slot): Promise<Slot>;
  findAllUpcoming(query: FindAllSlotsQuery): Promise<Slot[]>;
  upsert(query: BookSlotQuery): Promise<Slot | void>;
}

class SlotRepository implements ISlotRepository {

  constructor(
    private readonly logger: ILogger,
  ) { }

  async create(query: Slot): Promise<Slot> {
    try {
      const found = await SlotDAO.findOne({ code: query.code }).lean();

      if (found) {
        throw new Error('Slot resource already exists');
      }

      const newSlot = new SlotDAO(query);
      const created = await newSlot.save();

      return created ?? {};
    } catch (error) {
      this.logger.error({
        message: 'Error in SlotRepository.create',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }

  async findAllUpcoming(query: FindAllSlotsQuery): Promise<Slot[]> {
    try {

      // query db for every saved slot between the two dates
      const savedSlots = await SlotDAO.find({
        sellerCode: query.sellerCode,
        startDate: { '$gte': new Date(query.fromDate) },
        endDate: { '$lte': new Date(query.untilDate) },
      }).lean();
      const savedSlotDates: Date[] = savedSlots.map(slot => slot.startDate);

      // computes every possible datetime objects between two dates, with recurrence rules
      const computedDates: Date[] = await this.computeUpcomingSlots(query, savedSlotDates);
      const { teamCapacity: originalCapacity, slotDurationInMin } = config.get().businessRules;

      const computedSlots: Slot[] = computedDates.map(date => {
        const encoder: number = date.getTime();

        return new SlotDAO({
          code: utils.generateReadableCode(query.sellerCode, encoder),
          sellerCode: query.sellerCode,
          startDate: date,
          endDate: utils.addMinutes(date, slotDurationInMin),
          status: 'AVAILABLE',
          isAvailable: true,
          duration: slotDurationInMin,
          capacity: {
            original: originalCapacity,
            current: originalCapacity,
          },
          customersCodes: [],
        });
      });

      const all = [...computedSlots, ...savedSlots];

      return all;
    } catch (error) {
      this.logger.error({
        message: 'Error in SlotRepository.findAllUpcoming',
        data: {},
        error: error as Error,
      });

      throw error;
    }
  }


  async upsert(query: BookSlotQuery): Promise<Slot | void> {
    try {
      const { code, sellerCode } = query;
      const filters = {
        code,
        sellerCode,
      };
      const foundSlot = await SlotDAO.findOne(filters);

      if(!foundSlot) {
        return this.insert(query);
      }

      if(foundSlot.customersCodes.includes(query.customerCode)) {
        throw new Error(`Slot code ${code} already occupied by customer ${query.customerCode}`);
      }

      if(!foundSlot.isAvailable) {
        throw new Error(`Slot code ${code} is not available`);
      }

      const updatedCurrentCapacity = foundSlot.capacity.current - 1;

      foundSlot.capacity.current = updatedCurrentCapacity;
      foundSlot.status = updatedCurrentCapacity > 0 ? 'AVAILABLE' : 'UNAVAILABLE';
      foundSlot.isAvailable = updatedCurrentCapacity > 0;
      foundSlot.customersCodes.push(query.customerCode);

      return foundSlot.save();

    } catch (error) {
      this.logger.error({
        message: 'Error in SlotRepository.upsert',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }

  private async insert(query: BookSlotQuery): Promise<Slot> {
    const { code, sellerCode } = query;
    const { teamCapacity: originalCapacity, slotDurationInMin } = config.get().businessRules;
    const currentCapacity: number = (originalCapacity - 1) > 0 ? (originalCapacity - 1) : 0;
    const startTimestamp = utils.decodeReadableCode(sellerCode, code);
    const startDate = new Date(startTimestamp);

    const newBookedSlot = new SlotDAO({
      code,
      sellerCode,
      startDate,
      endDate: utils.addMinutes(startDate, slotDurationInMin),
      status: currentCapacity ? 'AVAILABLE' : 'UNAVAILABLE',
      isAvailable: currentCapacity > 0,
      duration: slotDurationInMin,
      capacity: {
        original: originalCapacity,
        current: currentCapacity,
      },
      customersCodes: [query.customerCode],
    });

    return newBookedSlot.save();
  }

  private async computeUpcomingSlots(
    { fromDate, untilDate, sellerCode }: Pick<FindAllSlotsQuery, 'untilDate' | 'fromDate' | 'sellerCode'>,
    exclusionDates: Date[]
  ): Promise<Date[]> {
    const seller = await SellerDAO.findOne({ code: sellerCode }).lean();

    if(!seller) {
      throw new Error('Seller not found');
    }

    const rruleSet: RRuleSet = new RRuleSet();
    const { slotDurationInMin } = config.get().businessRules;

    seller?.openingHours.map(day => {
      rruleSet.rrule(new RRule({
        freq: RRule.WEEKLY,
        dtstart: new Date(utils.utc(new Date(fromDate))),
        until: new Date(utils.utc(new Date(untilDate))),
        count: 56,
        interval: 1,
        byweekday: utils.getWeekDayNum(day.weekDay),
        byhour: utils.getHoursSequence(day.startTime, day.endTime),
        byminute: [0, slotDurationInMin],
        bysecond: [0],
      }));
    });

    exclusionDates.map(date => rruleSet.exdate(date));

    const computedDates: Date[] = rruleSet.all();

    return computedDates;
  }
}

export default SlotRepository;
