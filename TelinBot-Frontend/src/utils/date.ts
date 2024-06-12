import { format } from 'date-fns';

// Function to convert month number to month name
const getMonthName = (monthIndex: number, locale = undefined) => {
  // monthIndex should be from 1 (January) to 12 (December)
  const arbitraryYear = 2000; // The year is arbitrary and can be any valid year
  const date = new Date(arbitraryYear, monthIndex); // Year is arbitrary
  return format(date, 'MMMM', { locale });
};

function convertMonthEnToId(monthName: string) {
  const monthMap = {
    jan: 'Januari',
    feb: 'Februari',
    mar: 'Maret',
    apr: 'April',
    may: 'Mei',
    jun: 'Juni',
    jul: 'Juli',
    aug: 'Agustus',
    sep: 'September',
    oct: 'Oktober',
    nov: 'November',
    dec: 'Desember',
  };

  // Convert month to lowercase and remove any trailing characters
  monthName = monthName.toLowerCase().slice(0, 3);

  // Check if month exists in the map
  if (monthMap.hasOwnProperty(monthName)) {
    return monthMap[monthName];
  } else {
    // Handle invalid month (optional)
    return 'Invalid month name';
  }
}

function convertDayEnToId(dayEn: string) {
  // Convert the input day to lowercase for case-insensitive comparison
  const dayEnLower = dayEn.toLowerCase();

  // Map of English day names to Indonesian day names
  const dayMap = {
    monday: 'senin',
    tuesday: 'selasa',
    wednesday: 'rabu',
    thursday: 'kamis',
    friday: 'jumat',
    saturday: 'sabtu',
    sunday: 'minggu',
  };

  // Use get() method to retrieve the Indonesian day name or undefined if not found
  const dayIndo = dayMap[dayEnLower];

  // Return the Indonesian day name or 'Invalid day' if not found
  return dayIndo || 'Invalid day';
}

function convertDateToIndonesian(dateStr: string): string {
  // Create a Date object from the input string
  const date = new Date(dateStr);

  // Get the day of the week in Indonesian
  const dayNamesIndonesian = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];
  const dayOfWeek = dayNamesIndonesian[date.getDay()];

  // Get the month in Indonesian
  const monthNamesIndonesian = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const month = monthNamesIndonesian[date.getMonth()];

  // Get the day of the month
  const day = date.getDate();

  // Get the year
  const year = date.getFullYear();

  // Format the date string in Indonesian format
  return `${dayOfWeek}, ${day} ${month} ${year}`;
}

export {
  getMonthName,
  convertDateToIndonesian,
  convertDayEnToId,
  convertMonthEnToId,
};
