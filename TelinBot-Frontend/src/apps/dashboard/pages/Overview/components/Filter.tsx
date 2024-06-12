import { ContentWrapper } from '@/apps/dashboard/components';
import {
  generateMonthOptions,
  generateYearOptions,
} from '@/apps/dashboard/helpers/dropdown';
import Dropdown from '@/components/Dropdown';
import { DropdownOption } from '@/types/components/DropdownOption';
import React, { useEffect, useState } from 'react';

function Filter({ onSelect }) {
  const yearOptions = generateYearOptions(2020, 2024);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const monthOptions = generateMonthOptions();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const typeOptions = [
    { name: 'MTD', value: 'MTD' },
    { name: 'YTD', value: 'YTD' },
  ];
  const [selectedType, setSelectedType] = useState(typeOptions[0]);

  useEffect(() => {
    onSelect(selectedYear, selectedMonth, selectedType);
  }, [selectedYear, selectedMonth, selectedType]);

  return (
    <div className="d-flex flex-wrap justify-content-evenly align-items-center">
      <div className="d-flex p-2 align-items-center">
        <span className="fst-italic fw-bold" style={{ marginRight: '0.8rem' }}>
          Year :
        </span>
        <Dropdown
          placeholder={selectedYear.name}
          options={yearOptions}
          onSelect={(option: DropdownOption) => {
            setSelectedYear(option);
          }}
        />
      </div>
      <div className="d-flex p-2 align-items-center">
        <span className="fst-italic fw-bold" style={{ marginRight: '0.8rem' }}>
          Month :
        </span>
        <Dropdown
          placeholder={selectedMonth.name}
          options={monthOptions}
          onSelect={(option: DropdownOption) => {
            setSelectedMonth(option);
          }}
        />
      </div>
      <div className="d-flex p-2 align-items-center">
        <span className="fst-italic fw-bold" style={{ marginRight: '0.8rem' }}>
          Type :
        </span>
        <Dropdown
          placeholder={selectedType.name}
          options={typeOptions}
          onSelect={(option: DropdownOption) => {
            setSelectedType(option);
          }}
        />
      </div>
    </div>
  );
}

export default Filter;
