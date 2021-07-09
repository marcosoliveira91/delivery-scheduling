import { RRule } from 'rrule';

export interface IDateUtils {
  addDays(date: Date, days: number): Date;
  datesToStringArr(dates: Date[]): string[];
  toTimeSlotFormat(dateStart: Date, dateEnd: Date): string[];
  getDatesUntil(from: Date, daysCount: number): string[];
  normalizeDate(date: Date): Date;
  format(date: Date | string, options?: Intl.DateTimeFormatOptions): string
  utc(date: Date): number;
}

export default class DateUtils implements IDateUtils {
  static instance: DateUtils;
  private constructor() {}

  public static getInstance(): DateUtils {
    if (!DateUtils.instance) {
      DateUtils.instance = new DateUtils();
    }

    return DateUtils.instance;
  }

  public addDays(date: Date, days: number): Date {
    const result = new Date(date);

    result.setDate(result.getDate() + days);
    return result;
  }

  public datesToStringArr(dates: Date[]): string[] {
    return dates.map(d => d.toISOString().split('T')[0]);
  }

  public toTimeSlotFormat(startDatetime: Date | string, endDatetime: Date | string): string[] {
    const from = this.format(startDatetime, { timeStyle: 'short' });
    const to = this.format(endDatetime, { timeStyle: 'short' });

    return [from, to];
  }

  public getDatesUntil(from: Date, daysCount: number): string[] {
    const timeWindow = this.addDays(new Date(), daysCount);
    const rrule: RRule = new RRule({
      freq: RRule.DAILY,
      dtstart: new Date(this.utc(from)),
      until: new Date(this.utc(timeWindow)),
      count: daysCount,
      interval: 1,
    });

    return this.datesToStringArr(rrule.all());
  }

  public normalizeDate(date: Date): Date {
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  public format(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('pt-PT', { ...options }).format(new Date(date));
  }

  public utc(date: Date): number {
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      0,
      0
    );
  }
}
