import React from 'react';
import style from './style.module.css';
import UsersTable from './UsersTable';
import UsersSummary from './UsersSummary';
import UsersChartHistory from './UsersChartHistory';

function Main() {
  return (
    <div>
      <div className="mb-2">
        <UsersSummary />
      </div>
      <div className='mb-4'>
        <UsersChartHistory/>
      </div>
      <div className="mb-3">
        <UsersTable />
      </div>
    </div>
  );
}

export default Main;
