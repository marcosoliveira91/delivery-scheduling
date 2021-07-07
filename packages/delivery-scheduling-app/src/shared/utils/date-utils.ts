import { RRule } from 'rrule';

export interface IDateUtils {

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

  public getDateStr(dates: Date[]): string[] {
    return dates.map(d => d.toISOString().split('T')[0]);
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

    return this.getDateStr(rrule.all());
  }

  public normalizeDate(date: Date): Date {
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
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
