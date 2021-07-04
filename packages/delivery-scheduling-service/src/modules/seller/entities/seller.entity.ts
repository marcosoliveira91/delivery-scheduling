export interface Seller {
  code: string;
  name: string;
  openingHours: {
    weekDay: string,
    startTime: string;
    endTime: string;
  }[]
}
