import { AvailabilityStatus } from '../dtos/base/enums/availability-status.enum';
import { BookSlot } from '../dtos/queries/book-slot-query.dto';
import { BookSlotQuery } from '../entities/query/book-slot-query.entity';
import { Slot } from '../entities/slot.entity';
import { SlotDto } from '../dtos/slot.dto';

export class BookSlotMapper {

  public static toDomain(code: string, dto: BookSlot): BookSlotQuery {
    return {
      code,
      sellerCode: dto.sellerCode,
      customerCode: dto.customerCode,
    };
  }

  public static toDTO(entity: Slot): SlotDto {
    return {
      code: entity.code,
      status: entity.status as AvailabilityStatus,
      isAvailable: entity.isAvailable,
      sellerCode: entity.sellerCode,
      startDate: entity.startDate as string,
      endDate: entity.endDate as string,
      duration: {
        raw: entity.duration.raw,
        unit: entity.duration.unit,
      },
      capacity: {
        original: entity.capacity.original,
        current: entity.capacity.current,
      },
    };
  }
}
