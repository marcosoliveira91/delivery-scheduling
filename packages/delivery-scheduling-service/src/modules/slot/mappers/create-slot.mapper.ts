import * as utils from '../../../shared/utils';
import { AvailabilityStatus } from '../dtos/base/enums/availability-status.enum';
import { CreateSlotQueryDto } from '../dtos/queries/create-slot-query.dto';
import { ICapacity } from '../dtos/base/capacity.interface';
import { IDuration } from '../dtos/base/duration.interface';
import { Slot } from '../entities/slot.entity';
import { SlotDto } from '../dtos/slot.dto';
import { TimeUnits } from '../../../shared/interfaces/enums/time-unit.enum';

export class CreateSlotMapper {

  public static toDomain(dto: CreateSlotQueryDto): Slot {
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
      ...dto,
      code: utils.generateReadableCode(dto.sellerCode, encoder),
      status: capacity.current ? AvailabilityStatus.Available : AvailabilityStatus.Unavailable,
      isAvailable: capacity.current > 0,
      capacity,
      duration,
      startDate: utils.normalizeDate(new Date(dto.startDate)).toISOString(),
      endDate: utils.normalizeDate(new Date(dto.endDate)).toISOString(),
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
