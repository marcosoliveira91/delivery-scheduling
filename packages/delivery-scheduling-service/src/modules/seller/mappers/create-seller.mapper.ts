import * as utils from '../../../shared/utils';
import { CreateSellerQueryDto } from '../dtos/queries/create-seller-query.dto';
import { Seller } from '../entities/seller.entity';
import { ISellerDto } from '../dtos/seller.dto';
// import { v4 as uuid } from 'uuid';
import { WeekDays } from '../dtos/base/enums/week-days.enum';

export class CreateSellerMapper {

  public static toDomain(dto: CreateSellerQueryDto): Seller {
    return {
      // id: uuid(),
      code: utils.generateReadableCode(dto.name),
      // name: dto.name,
      // openingHours: dto.openingHours.map(businessDay => ({
      //   weekDay: businessDay.weekDay as string,
      //   startTime: businessDay.startTime,
      //   endTime: businessDay.endTime,
      // })),
      ...dto,
    };
  }

  public static toDTO(entity: Seller): ISellerDto {
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
