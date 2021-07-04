import { GetSlotsQueryDto } from '../dtos/queries/get-slots-query.dto';
import { FindAllSlotsQuery } from '../entities/query/find-all-slots-query.entity';
import { GetSlotsDto } from '../dtos/results/get-slots.dto';
import { Slot } from '../entities/slot.entity';
import { AvailableStatus } from '../dtos/base/enums/available-status.enum';

export class GetSlotsMapper {

  public static toDomain(dto: GetSlotsQueryDto): FindAllSlotsQuery {
    return {
      status: dto.status as string,
      ...dto,
    };
  }

  public static toDTO(entity: Slot[]): GetSlotsDto {
    return {
      slots: entity.map(slot => ({
        code: slot.code,
        status: slot.status as AvailableStatus,
        sellerCode: slot.sellerCode,
        startDate: slot.startDate,
        endDate: slot.endDate,
        duration: {
          raw: slot.duration.raw,
          unit: slot.duration.unit,
        },
        capacity: {
          original: slot.capacity.original,
          current: slot.capacity.current,
        },
      })),
    };
  }
}
