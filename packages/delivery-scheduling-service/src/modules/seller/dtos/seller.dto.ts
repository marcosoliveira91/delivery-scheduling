import { IOpeningHours } from './base/enums/opening-hours.interface';

export interface ISellerDto {
  code: string;
  name: string;
  openingHours: IOpeningHours[]
}
