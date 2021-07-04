import { SlotDto } from '../slot.dto';

type T = Pick<SlotDto, 'status' | 'capacity' | 'duration'>;
type PartialSlotQuery = Partial<T>;
type RequiredQueryDto = Omit<SlotDto, keyof T | 'code'>;

export interface CreateSlotQueryDto extends RequiredQueryDto, PartialSlotQuery {}

