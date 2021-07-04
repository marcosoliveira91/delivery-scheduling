export interface Slot {
  code: string;
  sellerCode: string;
  startDate: string;
  endDate: string;
  status: string, // 'AVAILABLE' | 'UNAVAILABLE';
  duration: {
    raw: number;
    unit: string; // 'HOUR' | 'MIN',
  },
  capacity: {
    original: number,
    current: number,
  },
}
