import { ContentWrapper } from '@/apps/dashboard/components';
import { getGrossProfit, getRevenue } from '@/services/overview';
import React, { useEffect, useState } from 'react';

const CardData = ({ title, value }) => {
  return (
    <div className="d-flex flex-column mb-2">
      <p className="fst-italic">{title}</p>
      <p
        className={`align-self-center fw-bold ${value > 0 ? 'text-success' : 'text-danger'}`}
      >
        {value} %
      </p>
    </div>
  );
};

const Card = ({ title, value, unit, achievement, growth }) => {
  return (
    <div className="card-summary-container p-4 p-sm-3 p-md-2 p-lg-2">
      <div className=" d-flex flex-column justify-content-between">
        <p className="card-summary-title">{title}</p>
        <p className="card-summary-value">{value?.toFixed(2)}</p>
        <p className="card-summary-unit align-self-end">{unit}</p>
      </div>
      <div>
        <CardData title={'Achievement'} value={achievement?.toFixed(2)} />
        <CardData title={'Growth'} value={growth?.toFixed(2)} />
      </div>
    </div>
  );
};

function AchievementGrowth({ filters }) {
  const [revenueData, setRevenueData] = useState();
  const [grossProfitData, setProfitData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const revenueResponse = await getRevenue(
        filters.year,
        filters.month,
        filters.type
      );
      setRevenueData(revenueResponse);

      const grossProfitResponse = await getGrossProfit(
        filters.year,
        filters.month,
        filters.type
      );
      setProfitData(grossProfitResponse);
    };
    fetchData();
  }, [filters]);

  return (
    <ContentWrapper>
      <div className="row d-flex justify-content-center align-items-center px-3">
        <div className="col-10 col-sm-6 col-md-6 col-lg-4 gy-3 gy-sm-0">
          <Card
            title="Revenue"
            value={revenueData?.revenue}
            unit="Bio"
            achievement={revenueData?.achievement}
            growth={revenueData?.growth}
          />
        </div>
        <div className="col-10 col-sm-6 col-md-6 col-lg-4 gy-3 gy-sm-0">
          <Card
            title="Traffic"
            value={9.96}
            unit="TB"
            achievement={77.45}
            growth={8.86}
          />
        </div>
        <div className="col-10 col-sm-6 col-md-6 col-lg-4 gy-lg-0 gy-md-3 gy-3">
          <Card
            title="Gross Profit"
            value={grossProfitData?.gross_profit}
            unit="Bio"
            achievement={grossProfitData?.achievement}
            growth={grossProfitData?.growth}
          />
        </div>
      </div>
    </ContentWrapper>
  );
}

export default AchievementGrowth;
