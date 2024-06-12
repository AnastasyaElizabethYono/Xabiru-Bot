import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import { getUsers } from '@/services/auth';

interface Data {
  currentOnline: number | undefined;
  todayOnline: number | undefined;
  availableUsers: number | undefined;
}
interface CardProps {
  title: string;
  total: number | undefined;
}

const SummaryCard: React.FC<CardProps> = ({ title, total }) => {
  return (
    <div className="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
      <ContentWrapper>
        <div className="d-flex align-items-center">
          <div className="mx-4">
            <FontAwesomeIcon
              icon={faUser}
              fontSize={45}
              className="text-color-primary"
            />
          </div>
          <div className="card-body">
            <h6 className="card-title fw-bold fs-md-1 mb-1">{title}</h6>
            <p className="card-text display-6">{total}</p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

function UsersSummary() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch current online users
      const responseCurrentOnline = await getUsers(undefined, true);
      const countCurrentOnline = responseCurrentOnline?.results?.length;
      // Fetch Today Online
      const responseTodayOnline = await getUsers(undefined, true);
      const countTodayOnline = responseTodayOnline?.results?.length;
      // Fetch Available users
      const responseAvailableUsers = await getUsers();
      const countAvailableUsers = responseAvailableUsers.results?.length;

      setData({
        currentOnline: countCurrentOnline,
        todayOnline: countTodayOnline,
        availableUsers: countAvailableUsers,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="row">
        <SummaryCard title="Pengguna Online" total={data?.currentOnline} />
        <SummaryCard title="Pengguna Hari Ini" total={data?.todayOnline} />
        <SummaryCard title="Total Pengguna" total={data?.availableUsers} />
      </div>
    </div>
  );
}

export default UsersSummary;
