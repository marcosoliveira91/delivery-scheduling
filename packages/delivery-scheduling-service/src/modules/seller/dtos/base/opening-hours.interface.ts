import { WeekDays } from './enums/week-days.enum';

export interface IOpeningHours {
  weekDay: WeekDays,
  startTime: string;
  endTime: string;
}
