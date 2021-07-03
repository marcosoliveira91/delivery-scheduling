import { WeekDays } from './week-days.enum';

export interface IOpeningHours {
  weekDay: WeekDays,
  startTime: string;
  endTime: string;
}
