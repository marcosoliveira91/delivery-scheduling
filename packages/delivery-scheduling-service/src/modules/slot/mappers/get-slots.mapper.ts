import { GetSlotsQueryDto } from '../dtos/queries/get-slots-query.dto';
import { IFindAllSlotsQuery } from '../entities/query/find-all-slots-query.entity';
import { GetSlotsDto } from '../dtos/results/get-slots.dto';
import { Slot } from '../entities/slot.entity';

export class GetSlotsMapper {

  public static toDomain(dto: GetSlotsQueryDto): IFindAllSlotsQuery {
    return {
      status: dto.status as string,
      ...dto,
    };
  }

  public static toDTO(entity: Slot[]): GetSlotsDto {
    return {
      slots: entity.map(seller => seller),
    };
  }
}
