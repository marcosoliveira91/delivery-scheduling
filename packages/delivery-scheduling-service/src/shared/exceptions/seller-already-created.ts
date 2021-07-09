import { BaseException } from './base-exception';

class SellerAlreadyCreatedException extends BaseException {
  readonly code = 'UNPROCESSABLE_SELLER_ENTITY';

  constructor(code: string) {
    super(`Seller ${code} already created`);

    Object.setPrototypeOf(this, SellerAlreadyCreatedException.prototype);
  }
}

export { SellerAlreadyCreatedException };
