import { BaseException } from '../../shared/exceptions/base-exception';

class SlotUnavailableException extends BaseException {
  readonly code = 'SLOT_UNAVAILABLE';

  constructor(code: string) {
    super(`Slot ${code} is not available`);

    Object.setPrototypeOf(this, SlotUnavailableException.prototype);
  }
}

export { SlotUnavailableException };
