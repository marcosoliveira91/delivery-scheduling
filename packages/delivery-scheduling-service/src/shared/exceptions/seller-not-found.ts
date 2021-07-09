import { BaseException } from './base-exception';

class SellerNotFoundException extends BaseException {
  readonly code = 'SELLER_NOT_FOUND';

  constructor(code: string) {
    super(`Seller ${code} not found`);

    Object.setPrototypeOf(this, SellerNotFoundException.prototype);
  }
}

export { SellerNotFoundException };
