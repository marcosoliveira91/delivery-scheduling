import * as utils from '../../shared/utils';
import config from '../../config';
import ILogger from '../../shared/logger/logger.interface';
import { BookSlotQuery } from './entities/query/book-slot-query.entity';
import { FindAllSlotsQuery } from './entities/query/find-all-slots-query.entity';
import { RRule, RRuleSet } from 'rrule';
import { SellerDAO, SlotDAO } from '../../shared/database/mongoose/models';
import { SellerNotFoundException, SlotUnavailableException } from '../../shared/exceptions';
import { Slot } from './entities/slot.entity';

export interface ISlotRepository {
  findAllUpcoming(query: FindAllSlotsQuery): Promise<Slot[]>;
  upsert(query: BookSlotQuery): Promise<Slot | void>;
}

class SlotRepository implements ISlotRepository {

  constructor(
    private readonly logger: ILogger,
  ) { }

  async findAllUpcoming(query: FindAllSlotsQuery): Promise<Slot[]> {
    try {

      // query db for every saved slot between the two dates
      const savedSlots = await SlotDAO.find({
        sellerCode: query.sellerCode,
        startDate: { '$gte': query.fromDate },
        endDate: { '$lte': query.untilDate },
      }).lean();
      const savedSlotDates: string[] = savedSlots.map(slot => slot.startDate);

      // computes every possible datetime objects between two dates, with recurrence rules
      const computedDates: Date[] = await this.computeUpcomingSlots(query, savedSlotDates);
      const { teamCapacity: originalCapacity, slotDurationInMin } = config.get().businessRules;

      const computedSlots: Slot[] = computedDates.map(date => {
        const encoder: number = date.getTime();
        const utcStr = date.toISOString();

        return new SlotDAO({
          code: utils.generateReadableCode(query.sellerCode, encoder),
          sellerCode: query.sellerCode,
          startDate: utcStr,
          endDate: utils.addMinutes(date, slotDurationInMin).toISOString(),
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
        throw new SlotUnavailableException(code);
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
      startDate: startDate.toISOString(),
      endDate: utils.addMinutes(startDate, slotDurationInMin).toISOString(),
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

  // to be extracted into a domain service
  private async computeUpcomingSlots(
    { fromDate, untilDate, sellerCode }: Pick<FindAllSlotsQuery, 'untilDate' | 'fromDate' | 'sellerCode'>,
    exclusionDates: string[]
  ): Promise<Date[]> {
    const seller = await SellerDAO.findOne({ code: sellerCode }).lean();

    if(!seller) {
      throw new SellerNotFoundException(sellerCode);
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

    exclusionDates.map(date => rruleSet.exdate(new Date(utils.utc(new Date(date)))));

    const computedDates: Date[] = rruleSet.all();

    return computedDates;
  }
}

export default SlotRepository;
