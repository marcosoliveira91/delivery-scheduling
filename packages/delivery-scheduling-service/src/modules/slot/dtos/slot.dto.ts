import { ICapacity } from './base/capacity.interface';
import { IDuration } from './base/duration.interface';
import { AvailabilityStatus } from './base/enums/availability-status.enum';

export interface SlotDto {
  code: string;
  sellerCode: string;
  startDate: string;
  endDate: string;
  status: AvailabilityStatus,
  isAvailable: boolean,
  duration: IDuration,
  capacity: ICapacity,
}
