// 知道該月有幾天
export function getLastDayOfMonth(year: number, month: number) {
  const nextMonth = new Date(year, month + 1, 1);
  const lastDay = new Date(nextMonth.getTime() - 1);
  return lastDay.getDate();
}

// padEnd for array
export function padEnd(
  array: null | Date[],
  minLength: number,
  fillValue = undefined
) {
  return Object.assign(new Array(minLength).fill(fillValue), array);
}

export const formatDateToYYYYMMDD = (date: Date) => {
  if (!date) return { YYYY: "", MM: "", DD: "" };
  // 使用 padStart 確保月份和日期是兩位數
  const YYYY = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const DD = date.getDate().toString().padStart(2, "0");
  // 將它們作為對象返回
  return { YYYY, MM, DD };
};

export const transDateIntoString = (date: Date) => {
  const { YYYY, MM, DD } = formatDateToYYYYMMDD(date);
  return `${YYYY}${MM}${DD}`;
};

// 生成日期arr
export function getMonthDays(year: number, month: number) {
  const weekday = new Date(year, month, 1).getDay();
  const lastDay = getLastDayOfMonth(year, month);
  const days: Date[] = [];

  for (let i = weekday - 1; i >= 0; i -= 1) {
    days.unshift(
      new Date(year, month - 1, getLastDayOfMonth(year, month - 1) - i)
    );
  }
  for (let i = 1; i <= lastDay; i += 1) {
    days.push(new Date(year, month, i));
  }

  const daysToFill = days.length > 35 ? 42 - days.length : 35 - days.length;
  for (let i = 1; i <= daysToFill; i += 1) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

// 生成select選項
export function generateYearsArray(
  startYear: number,
  endYear: number
): string[] {
  const yearsArray: string[] = [];
  for (let year = startYear; year < endYear; year += 1) {
    yearsArray.push(`${year}`);
  }
  return yearsArray;
}

export function getMonthRangeArray(min: Date, max: Date): Date[] {
  const months: Date[] = [];
  const current = new Date(min);
  current.setDate(1); // Ensure we're at the beginning of the month

  while (current <= max) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

export function omitTimeFromDate(date: Date) {
  if (!date) return new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day);
}
