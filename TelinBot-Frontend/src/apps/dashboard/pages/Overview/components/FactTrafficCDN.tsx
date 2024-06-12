import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import { getCDNRevenue, getTrafficCDN } from '@/services/overview';
import { convertGBtoTB, truncate } from '@/utils/format';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getMaxValue } from '../../helpers';
import { CustomTooltipProps } from '@/types/components/CustomTooltip';
import { Option } from '@/types/components/Option';
import Select from 'react-select';

interface DataProps {
  x: number;
  y: any;
}

interface ChartProps {
  data: DataProps[];
  summary: string;
  height?: number;
}

const renderCustomAxisTick = ({ payload, x, y, width, height }) => {
  const maxLength = 10; // Max length of text allowed
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {truncate(payload.value, maxLength)}
      </text>
    </g>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <h4 className="fs-md-1 fst-italic">{label}</h4>
        <span className="fs-rg">Total: {payload[0].value}</span>
      </div>
    );
  }
  return null;
};

const HorizontalChart: React.FC<ChartProps> = ({
  data,
  summary,
  height = 250,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          bottom: 25,
          left: 30,
        }}
      >
        <XAxis type="number" domain={[0, getMaxValue(data)]}>
          <Label
            value={summary === 'usage' ? 'Usage (TB)' : 'IDR (Mil)'}
            dy={30}
          />
        </XAxis>
        <YAxis
          type="category"
          dataKey="y"
          tick={renderCustomAxisTick}
          style={{ fontSize: '10px' }}
        />

        <Tooltip content={CustomTooltip} />
        <Bar dataKey="x" fill="#ff4b4b" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const filterOptions: Option[] = [
  { label: 'Customer', value: 'customer_name' },
  { label: 'Product', value: 'product_name' },
  { label: 'Partner', value: 'partner' },
];

const summaryOptions: Option[] = [
  { label: 'Revenue', value: 'revenue' },
  { label: 'Usage', value: 'usage' },
];

function FactTrafficCDN({ filters }) {
  const [data, setData] = useState([]);
  const [totalQueries, setTotalQueries] = useState(0);
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  );
  const [selectedSummaryOption, setSelectedSummaryOption] = useState(
    summaryOptions[0]
  );

  const handleSelectFilter = (option: Option) => {
    setSelectedFilterOption(option);
  };

  const handleSelectSummary = (option: Option) => {
    setSelectedSummaryOption(option);
  };

  useEffect(() => {
    const trafficCDNSummary = async () => {
      const responseData =
        selectedSummaryOption.value === 'usage'
          ? await getTrafficCDN(
              selectedFilterOption.value,
              filters.year,
              filters.month,
              filters.type,
              5
            )
          : await getCDNRevenue(
              selectedFilterOption.value,
              filters.year,
              filters.month,
              filters.type,
              5
            );

      const totalQueries = responseData.total_queries;
      const data = responseData.data;

      const convertedData = data.map((item) => ({
        x:
          selectedSummaryOption.value === 'usage'
            ? convertGBtoTB(item.total)
            : Math.abs(item.total) / 1_000_000,
        y: item.name,
      }));
      setTotalQueries(totalQueries);
      setData(convertedData);
    };
    trafficCDNSummary();
  }, [selectedFilterOption, selectedSummaryOption, filters]);

  return (
    <ContentWrapper title="Traffic CDN Summary">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p>
          From <strong>{totalQueries}</strong> Queries
        </p>
        <div className="row d-flex gy-2">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-row align-items-center justify-content-end">
              <span className="fst-italic fw-bold mx-2">Summary</span>
              <Select
                value={selectedSummaryOption}
                onChange={handleSelectSummary}
                options={summaryOptions}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex flex-row align-items-center justify-content-end">
              <span className="fst-italic fw-bold mx-2">Filter</span>
              <Select
                value={selectedFilterOption}
                onChange={handleSelectFilter}
                options={filterOptions}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {totalQueries > 0 ? (
          <HorizontalChart
            data={data}
            height={250}
            summary={selectedSummaryOption.value}
          />
        ) : (
          <h5 className="text-secondary">No record found</h5>
        )}
      </div>
    </ContentWrapper>
  );
}

export default FactTrafficCDN;
