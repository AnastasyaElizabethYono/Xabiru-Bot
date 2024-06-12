import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import { getUsersHistoryRange } from '@/services/auth';
import { CustomTooltipProps } from '@/types/components/CustomTooltip';
import { ChartDataProps } from '@/types/data/ChartDataProps';
import { DataProps } from '@/types/data/DataProps';
import { getMaxValue } from '../../helpers';
import { getDateLength, getDayAgo } from '../utils/date';
import {
  convertDateToIndonesian,
  convertDayEnToId,
  convertMonthEnToId,
} from '@/utils/date';

const getFormattedRangeData = (
  startDate: string,
  endDate: string,
  data: DataProps[]
): DataProps[] => {
  let resultData: DataProps[] = [];
  if (!data) return [];
  const dateLength = getDateLength(startDate, endDate);
  for (let i = dateLength; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0] + 'T00:00:00Z'; // Format to match the data
    const dataEntry = data.find((d) => d.x === dateString);
    resultData.push({ x: dateString, y: dataEntry ? dataEntry.y : 0 });
  }
  return resultData;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <h4 className="fs-md-1">
          {convertDateToIndonesian(format(parseISO(label), 'eeee, d MMM yyyy'))}
        </h4>
        <span className="fs-lg">{payload[0].value} Pengguna</span>
      </div>
    );
  }
  return null;
};

const Chart: React.FC<ChartDataProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3a5299" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3a5299" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="y"
          stroke="#3a5299"
          fillOpacity={1}
          fill="url(#color)"
        />

        <XAxis
          dataKey="x"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 2 === 1) {
              const day = format(date, 'd');
              const month = convertMonthEnToId(format(date, 'MMM'));

              return `${month}, ${day}`;
            }
            return '';
          }}
        />

        <YAxis
          dataKey="y"
          label={{
            value: 'Total Pengguna',
            angle: -90,
            position: 'insideLeft',
          }}
          axisLine={false}
          tickLine={false}
          tickCount={5}
          allowDecimals={false}
          tickFormatter={(number) => Math.floor(number).toString()}
          domain={[0, getMaxValue(data)]}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

function UsersChartHistory() {
  const [data, setData] = useState<DataProps[] | []>([]);

  const defaultDateRange = getDayAgo(7);
  const [startDate, setStartDate] = useState<string>(
    defaultDateRange.startDate
  );
  const [endDate, setEndDate] = useState<string>(defaultDateRange.endDate);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    const newEndDate = new Date(endDate);

    if (newStartDate <= newEndDate) {
      setStartDate(e.target.value);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    const newStartDate = new Date(startDate);
    if (newEndDate >= newStartDate) {
      setEndDate(e.target.value);
    }
  };

  useEffect(() => {
    const fetchUsersHistory = async () => {
      const responseData = await getUsersHistoryRange(startDate, endDate);
      const formattedData = responseData?.map((item) => ({
        x: item.date,
        y: item.value,
      }));
      setData(getFormattedRangeData(startDate, endDate, formattedData));
    };
    fetchUsersHistory();
  }, [startDate, endDate]);

  return (
    <ContentWrapper title="TRAFFIC PENGGUNA">
      <div className="d-flex justify-content-end">
        <div
          className="d-flex align-items-center mb-5"
          style={{ width: '20rem' }}
        >
          <input
            type="date"
            value={startDate}
            className="form-control"
            onChange={handleStartDateChange}
          />
          <span className="mx-2">-</span>
          <input
            type="date"
            value={endDate}
            className="form-control"
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <Chart data={data} />
    </ContentWrapper>
  );
}

export default UsersChartHistory;
