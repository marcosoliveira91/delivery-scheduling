import { SlotDto } from '../slot.dto';

type OptionalKeys = Pick<SlotDto, 'status' | 'isAvailable' | 'capacity' | 'duration'>;
type PartialSlotQuery = Partial<OptionalKeys>;
type RequiredQueryDto = Omit<SlotDto, keyof OptionalKeys | 'code'>;

export interface CreateSlotQueryDto extends RequiredQueryDto, PartialSlotQuery {}

