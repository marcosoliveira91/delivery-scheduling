import { AvailableStatus } from '../base/enums/available-status.enum';

export interface GetSlotsQueryDto {
  sellerCode: string;
  fromDate: string;
  toDate: string;
  status?: AvailableStatus,
}
