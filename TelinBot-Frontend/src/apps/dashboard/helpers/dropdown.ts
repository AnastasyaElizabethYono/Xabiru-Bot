import { getMonthName } from '@/utils/date';

const generateYearOptions = (start: number, end: number) =>
  [...Array(end - start + 1).keys()].map((i) => ({
    name: `${start + i}`,
    value: start + i,
  }));

const generateMonthOptions = () =>
  [...Array(12 - 1 + 1).keys()].map((i) => ({
    name: getMonthName(i),
    value: 1 + i,
  }));

export { generateYearOptions, generateMonthOptions };
