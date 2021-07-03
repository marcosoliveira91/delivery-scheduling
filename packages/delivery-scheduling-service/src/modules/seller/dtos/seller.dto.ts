import { IOpeningHours } from './base/enums/opening-hours.interface';

export interface SellerDto {
  code: string;
  name: string;
  openingHours: IOpeningHours[]
}
