import { Seller } from '../entities/seller.entity';
import { WeekDays } from '../dtos/base/enums/week-days.enum';
import { IGetSellersDto } from '../dtos/results/get-sellers.dto';

export class GetSellersMapper {

  public static toDTO (entity: Seller[]): IGetSellersDto {
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
