import { IOpeningHours } from './base/opening-hours.interface';

export interface SellerDto {
  code: string;
  name: string;
  openingHours: IOpeningHours[]
}
