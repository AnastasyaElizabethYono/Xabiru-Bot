import { format, subDays } from 'date-fns';

const getDayAgo = (daysAgo: number) => {
  const today = new Date();
  const oneWeekAgo = subDays(today, daysAgo);

  return {
    startDate: format(oneWeekAgo, 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
  };
};

const getDateLength = (startDate: string, endDate: string) => {
  // Parse the input dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in time (milliseconds)
  const timeDiff = end - start;

  // Convert the time difference from milliseconds to days
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  // Return the difference in days
  return dayDiff;
};

export { getDayAgo, getDateLength };
