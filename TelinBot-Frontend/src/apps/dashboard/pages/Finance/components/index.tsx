import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import Dropdown from '@/components/Dropdown';
import { getFinanceReport } from '@/services/finance';
import { DropdownOption } from '@/types/components/DropdownOption';
import React, { useContext, useEffect, useState } from 'react';
import { completeQuarters } from '../helpers';
import FinanceReport from './FinanceReport';
import { ActionContext } from '../hooks/ActionContext';
import Select from 'react-select';
import { Option } from '@/types/components/Option';
interface FinanceData {
  id?: number;
  year: number;
  q: number;
  file?: string;
}

const options: Option[] = [
  { label: '2020', value: 2020 },
  { label: '2021', value: 2021 },
  { label: '2022', value: 2022 },
  { label: '2023', value: 2023 },
  { label: '2024', value: 2024 },
];

function Main() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error(
      'useContext(context) is null because it is not inside a provider'
    );
  }

  const { isActionActive } = context;

  const [data, setData] = useState<FinanceData[] | []>([]);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getFinanceReport(selectedOption.value);
      const yearlyData = completeQuarters(responseData, selectedOption.value);
      setData(yearlyData);
    };
    fetchData();
  }, [selectedOption, isActionActive]);

  return (
    <ContentWrapper title="Financial Report">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-11">
          <div
            className=" d-flex justify-content-end mb-4"
            style={{ marginRight: 30 }}
          >
            <Select
              options={options}
              value={selectedOption.value}
              onChange={handleSelect}
            />
          </div>
          <div className="d-flex flex-column w-100">
            {data.map((item) => {
              return (
                <div
                  className="mb-4 flex-grow-1"
                  key={`${item.q}-${item.year}`}
                >
                  <FinanceReport
                    id={item.id}
                    year={item.year}
                    q={item.q}
                    title={`Laporan Keuangan Q${item.q} ${selectedOption.label}`}
                    file={item.file}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Main;
