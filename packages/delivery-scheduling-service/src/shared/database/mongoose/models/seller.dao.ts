import { Schema, model } from 'mongoose';

interface Seller {
  code: string;
  name: string;
  openingHours: Array<{
    weekDay: string,
    startTime: string;
    endTime: string;
  }>;
}

const schema = new Schema<Seller>({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  openingHours: [{
    weekDay: String,
    startTime: String,
    endTime: String,
  }],
});

const SellerDAO = model<Seller>('Seller', schema);

export { SellerDAO };
