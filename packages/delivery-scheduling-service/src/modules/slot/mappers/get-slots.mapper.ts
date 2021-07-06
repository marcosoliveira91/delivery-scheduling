import * as utils from '../../../shared/utils/date-utils';
import { AvailabilityStatus } from '../dtos/base/enums/availability-status.enum';
import { FindAllSlotsQuery } from '../entities/query/find-all-slots-query.entity';
import { GetSlotsDto } from '../dtos/results/get-slots.dto';
import { GetSlotsQueryDto } from '../dtos/queries/get-slots-query.dto';
import { Slot } from '../entities/slot.entity';

export class GetSlotsMapper {

  public static toDomain(dto: GetSlotsQueryDto): FindAllSlotsQuery {
    return {
      ...dto,
      status: dto.status as AvailabilityStatus,
      fromDate: dto.fromDate ?? utils.normalizeDate(new Date()).toISOString(),
      untilDate: utils.normalizeDate(new Date(dto.untilDate)).toISOString(),
    };
  }

  public static toDTO(entity: Slot[]): GetSlotsDto {
    return {
      slots: entity.map(slot => {
        const isAvailable = slot.status === AvailabilityStatus.Available;

        return {
          code: slot.code,
          status: isAvailable ? AvailabilityStatus.Available : AvailabilityStatus.Unavailable,
          isAvailable,
          sellerCode: slot.sellerCode,
          startDate: slot.startDate as string,
          endDate: slot.endDate as string,
          duration: {
            raw: slot.duration.raw,
            unit: slot.duration.unit,
          },
          capacity: {
            original: slot.capacity.original,
            current: slot.capacity.current,
          },
        };
      }),
    };
  }
}
