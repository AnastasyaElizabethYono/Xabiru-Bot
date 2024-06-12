interface ChartDataProps {
  x: number;
  y: any;
}

export default function getMaxValue(data: ChartDataProps[]): number {
  const max_val = Math.max(...data.map((item) => item.x));
  return max_val;
}
