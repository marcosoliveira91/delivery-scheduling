import { IOpeningHours } from '../base/enums/opening-hours.interface';

export interface CreateSellerResultDto {
  code: string;
  name: string;
  openingHours: IOpeningHours[]
}
