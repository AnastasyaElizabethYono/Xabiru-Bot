import React, { useState } from 'react';
import FactTrafficCDN from './FactTrafficCDN';
import FactTopTraffic from './FactTopTraffic';
import Filter from './Filter';
import AchievementGrowth from './AchievementGrowth';

function Main() {
  const [selectedFilters, setSelectedFilters] = useState({
    year: 2020,
    month: 1,
    type: 'MTD',
  });

  const selectFilters = (year, month, type) => {
    setSelectedFilters({
      year: year.value,
      month: month.value,
      type: type.value,
    });
  };

  return (
    <>
      <div className="mb-3">
        <h1>CDN Sales & Security Performance</h1>
      </div>
      <div className="mb-3">
        <Filter onSelect={selectFilters} />
      </div>
      <div className="mb-3">
        <AchievementGrowth filters={selectedFilters} />
      </div>
      <div className="mb-3">
        <FactTrafficCDN filters={selectedFilters} />
      </div>
      <div className="mb-3">
        <FactTopTraffic filters={selectedFilters} />
      </div>
    </>
  );
}

export default Main;
