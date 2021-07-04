import * as utils from '../../../shared/utils';
import { CreateSlotQueryDto } from '../dtos/queries/create-slot-query.dto';
import { Slot } from '../entities/slot.entity';
import { SlotDto } from '../dtos/slot.dto';
import { ICapacity } from '../dtos/base/capacity.interface';
import { IDuration } from '../dtos/base/duration.interface';
import { TimeUnits } from '../dtos/base/enums/time-unit.enum';
import { AvailableStatus } from '../dtos/base/enums/available-status.enum';

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
      code: utils.generateReadableCode(dto.sellerCode, encoder),
      status: capacity.current ? AvailableStatus.Available : AvailableStatus.Unavailable,
      capacity,
      duration,
      ...dto,
    };
  }

  public static toDTO(entity: Slot): SlotDto {
    return {
      code: entity.code,
      status: entity.status as AvailableStatus,
      sellerCode: entity.sellerCode,
      startDate: entity.startDate,
      endDate: entity.endDate,
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
