import { CreateSellerQuery } from './create-seller-query.entity';

export type PartialUpdateSellerQuery = Partial<CreateSellerQuery> & { code: string; }
