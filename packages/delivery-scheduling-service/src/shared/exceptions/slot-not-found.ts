import { BaseException } from './base-exception';

class SlotNotFoundException extends BaseException {
  readonly code = 'SLOT_NOT_FOUND';

  constructor(code: string) {
    super(`Slot ${code} not found`);

    Object.setPrototypeOf(this, SlotNotFoundException.prototype);
  }
}

export { SlotNotFoundException };
