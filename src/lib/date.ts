import { capitalize } from "./string";

export const incrementDateByOneDay = (date: Date) => {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + oneDayInMs);
};

export const decrementDateByDays = (date: Date, days: number): Date => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsToSubtract = days * millisecondsPerDay;
  return new Date(date.getTime() - millisecondsToSubtract);
};

export function formatDateForDisplay(date: Date) {
  return capitalize(
    new Intl.DateTimeFormat("hu-HU", {
      month: "long",
      day: "numeric",
    }).format(date)
  );
}

// 1: monday, 7: sunday
export function getWeekdayNumber(date: Date): number {
  return ((date.getDay() + 6) % 7) + 1;
}

//format (M)MDD, no leading zero
export function formatMonthDay(date: Date): number {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month * 100 + day;
}

//TODO: AI generated, not checked if its fully correct. (M)MDD format date
export function isDateInRange(date: number, start: number, end: number): boolean {
  const getDateComponents = (dateNum: number) => {
    const month = Math.floor(dateNum / 100);
    const day = dateNum % 100;
    return { month, day };
  };

  const { month: dateMonth, day: dateDay } = getDateComponents(date);
  const { month: startMonth, day: startDay } = getDateComponents(start);
  const { month: endMonth, day: endDay } = getDateComponents(end);

  const startDate = new Date(2000, startMonth - 1, startDay);
  const endDate = new Date(2000, endMonth - 1, endDay);
  let result;

  if (startDate <= endDate) {
    const dateToCheck = new Date(2000, dateMonth - 1, dateDay);
    result = dateToCheck >= startDate && dateToCheck <= endDate;
  } else {
    const dateToCheck = new Date(2001, dateMonth - 1, dateDay);
    result = dateToCheck >= startDate || dateToCheck <= endDate;
  }

  return result;
}

export function getDayNumber(date: Date) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

export function getDayNameByNumber(num: number) {
  const days: { [key: number]: string } = {
    1: "Hétfő",
    2: "Kedd",
    3: "Szerda",
    4: "Csütörtök",
    5: "Péntek",
    6: "Szombat",
    7: "Vasárnap",
  };
  if (num < 1 || num > 7) return "";
  return days[num];
}

export function calculateDaysDifference(date1: Date, date2: Date): number {
  const oneDay: number = 24 * 60 * 60 * 1000;
  return Math.abs(normalizeDateForComparison(date1) - normalizeDateForComparison(date2)) / oneDay;
}

export const normalizeDateForComparison = (date: Date): number => {
  return new Date(1970, date.getMonth(), date.getDate()).setHours(0, 0, 0, 0);
};
