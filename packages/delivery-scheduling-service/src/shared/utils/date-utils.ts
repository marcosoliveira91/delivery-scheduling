import { WeekDays } from '../interfaces/enums';

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

const getWeekDayNum = (dayStr: string | WeekDays): number => {
  return Object.values(WeekDays).findIndex(el => el === dayStr);
};

const getHoursSequence = (startTime: string, endTime: string): number[] => {
  const lowerBound = Number(startTime.split(':')[0]);
  const upperBound = Number(endTime.split(':')[0]);
  const size: number = upperBound - lowerBound;

  return Array(size).fill(0).map((_, i) => i + lowerBound);
};

const normalizeDate = (date: Date): Date => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const utc = (date: Date): number => {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    0,
    0
  );
};

export {
  addMinutes,
  getWeekDayNum,
  getHoursSequence,
  normalizeDate,
  utc,
};
