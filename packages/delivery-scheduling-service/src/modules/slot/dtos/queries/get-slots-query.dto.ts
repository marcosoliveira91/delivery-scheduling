export interface GetSlotsQueryDto {
  sellerCode: string;
  startDate: string;
  endDate: string;
  status?: string, // 'AVAILABLE' | 'UNAVAILABLE';
}
