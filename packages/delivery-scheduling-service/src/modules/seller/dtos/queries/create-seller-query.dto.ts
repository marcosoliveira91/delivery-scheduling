import { IOpeningHours } from '../base/opening-hours.interface';

export interface CreateSellerQueryDto {
  name: string;
  openingHours: IOpeningHours[];
}
