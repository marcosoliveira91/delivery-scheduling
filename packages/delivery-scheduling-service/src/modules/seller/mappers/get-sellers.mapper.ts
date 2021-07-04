import { GetSellersDto } from '../dtos/results/get-sellers.dto';
import { Seller } from '../entities/seller.entity';
import { WeekDays } from '../dtos/base/enums/week-days.enum';

export class GetSellersMapper {

  public static toDTO (entity: Seller[]): GetSellersDto {
    return {
      sellers: entity.map(seller => ({
        code: seller.code,
        name: seller.name,
        openingHours: seller.openingHours.map(period => ({
          weekDay: period.weekDay as WeekDays,
          startTime: period.startTime,
          endTime: period.endTime,
        })),
      })),
    };
  }
}
