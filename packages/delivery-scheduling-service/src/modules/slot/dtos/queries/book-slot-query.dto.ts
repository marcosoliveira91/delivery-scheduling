import { CreateSlotQueryDto } from './create-slot-query.dto';

export type BookSlot = CreateSlotQueryDto & {
  customerCode: string;
}
