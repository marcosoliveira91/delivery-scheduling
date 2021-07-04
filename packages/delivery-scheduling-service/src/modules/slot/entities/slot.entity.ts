export interface Slot {
  code: string;
  sellerCode: string;
  startDate: string;
  endDate: string;
  status: string,
  duration: {
    raw: number;
    unit: string;
  },
  capacity: {
    original: number,
    current: number,
  },
}
