export interface Slot {
  code: string;
  sellerCode: string;
  startDate: string | Date;
  endDate: string | Date;
  status: string,
  isAvailable: boolean;
  duration: {
    raw: number;
    unit: string;
  },
  capacity: {
    original: number,
    current: number,
  },
}
