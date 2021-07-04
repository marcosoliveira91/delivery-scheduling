import { ICapacity } from './base/capacity.interface';
import { IDuration } from './base/duration.interface';
import { AvailableStatus } from './base/enums/available-status.enum';

export interface SlotDto {
  code: string;
  sellerCode: string;
  startDate: string;
  endDate: string;
  status: AvailableStatus,
  duration: IDuration,
  capacity: ICapacity,
}
