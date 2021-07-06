import { WeekDays } from '../../../../shared/interfaces/enums';

export interface IOpeningHours {
  weekDay: WeekDays,
  startTime: string;
  endTime: string;
}
