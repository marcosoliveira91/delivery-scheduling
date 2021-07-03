import { IOpeningHours } from '../base/enums/opening-hours.interface';

export interface CreateSellerQueryDto {
  name: string;
  openingHours: IOpeningHours[];
}
