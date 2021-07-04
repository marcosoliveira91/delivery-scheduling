import { PartialUpdateSellerQuery } from '../entities/queries/partial-update-seller-query.entity';
import { PartialUpdateSellerQueryDto } from '../dtos/queries/partial-update-seller-query.dto';
import { Seller } from '../entities/seller.entity';
import { SellerDto } from '../dtos/seller.dto';
import { WeekDays } from '../dtos/base/enums/week-days.enum';

export class PartialUpdateSellerMapper {

  public static toDomain(code:string, dto: PartialUpdateSellerQueryDto): PartialUpdateSellerQuery {
    return {
      code,
      ...dto,
    };
  }

  public static toDTO(entity: Seller): SellerDto {
    return {
      code: entity.code,
      name: entity.name,
      openingHours: entity.openingHours.map(period => ({
        weekDay: period.weekDay as WeekDays,
        startTime: period.startTime,
        endTime: period.endTime,
      })),
    };
  }
}
