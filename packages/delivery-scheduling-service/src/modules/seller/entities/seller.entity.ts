export interface Seller {
  id: string;
  code: string;
  name: string;
  openingHours: {
    weekDay: string,
    startTime: string;
    endTime: string;
  }[]
}
