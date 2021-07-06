import { AvailabilityStatus } from '../base/enums/availability-status.enum';

export interface GetSlotsQueryDto {
  sellerCode: string;
  fromDate?: string;
  untilDate: string;
  status?: AvailabilityStatus,
}
