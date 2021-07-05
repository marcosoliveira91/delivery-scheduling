import * as utils from '../../../shared/utils';
import { CreateSellerQueryDto } from '../dtos/queries/create-seller-query.dto';
import { Seller } from '../entities/seller.entity';
import { SellerDto } from '../dtos/seller.dto';
// import { v4 as uuid } from 'uuid';
import { WeekDays } from '../dtos/base/enums/week-days.enum';

export class CreateSellerMapper {

  public static toDomain(dto: CreateSellerQueryDto): Seller {
    return {
      code: utils.generateReadableCode(dto.name, dto.name.length),
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
