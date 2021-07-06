import { Schema, model } from 'mongoose';

export interface Slot {
  code: string;
  sellerCode: string;
  startDate: Date;
  endDate: Date;
  status: string,
  isAvailable: boolean,
  duration: {
    raw: number;
    unit: string;
  },
  capacity: {
    original: number,
    current: number,
  },
  customersCodes: string[];
}

const schema = new Schema<Slot>({
  code: {
    type: String,
    required: true,
  },
  sellerCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'UNAVAILABLE'],
  },
  isAvailable: { type: Boolean },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    raw: {
      type: Number,
      default: 30,
    },
    unit: {
      type: String,
      enum: ['MIN', 'HOUR'],
      default: 'MIN',
    },
  },
  capacity: {
    current: { type: Number },
    original: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  customersCodes: [String],
});

const SlotDAO = model<Slot>('Slot', schema);

export { SlotDAO };
