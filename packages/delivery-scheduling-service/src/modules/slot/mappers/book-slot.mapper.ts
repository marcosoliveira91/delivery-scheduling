import * as utils from '../../../shared/utils';
import { AvailableStatus } from '../dtos/base/enums/available-status.enum';
import { BookSlot } from '../dtos/queries/book-slot-query.dto';
import { BookSlotQuery } from '../entities/query/book-slot-query.entity';
import { ICapacity } from '../dtos/base/capacity.interface';
import { IDuration } from '../dtos/base/duration.interface';
import { TimeUnits } from '../dtos/base/enums/time-unit.enum';

export class BookSlotMapper {

  public static toDomain(code: string, dto: BookSlot): BookSlotQuery {
    const encoder: number = new Date(dto.startDate).getTime();
    const capacity: ICapacity = dto.capacity ?? {
      original: 1,
      current: 1,
    };
    const duration: IDuration = dto.duration ?? {
      raw: 30,
      unit: TimeUnits.Minute,
    };

    return {
      code: code ?? utils.generateReadableCode(dto.sellerCode, encoder),
      status: capacity.current ? AvailableStatus.Available : AvailableStatus.Unavailable,
      capacity,
      duration,
      ...dto,
    };
  }
}
