interface FinanceData {
  id?: number;
  year: number;
  q: number;
  file?: string;
}

export default function completeQuarters(
  data: FinanceData[],
  year: number
): FinanceData[] {
  const quarters = 4; // Number of quarters to ensure presence of
  for (let q = 1; q <= quarters; q++) {
    const found = data.some((item) => item.year === year && item.q === q);
    if (!found) {
      data.push({
        year,
        q,
      }); // id and file will be undefined by default
    }
  }
  return data.sort((a, b) => a.q - b.q);
}
