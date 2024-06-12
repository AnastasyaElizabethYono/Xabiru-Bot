import React, { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import { getUsers, getUsersFilter } from '@/services/auth';
import { UserData } from '@/types/auth/User';
import { PaginatedNumberResponse } from '@/types/api/PaginatedNumberResponse';

type ActiveButtonState = 'allUsers' | 'online' | 'offline';

interface OnlineStatusProps {
  isOnline: boolean;
  lastLogin: string | null;
}

// Custom debounce function
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Never';
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OnlineStatus: React.FC<OnlineStatusProps> = ({ isOnline, lastLogin }) => {
  if (isOnline) {
    return <div className="text-success">Online</div>;
  }
  // return <div className="text-danger">Offline</div>;
  return <div className="text-danger">Offline </div>;
};

function UsersTable() {
  const [data, setData] = useState<PaginatedNumberResponse<UserData[]>>();
  const [activeButton, setActiveButton] =
    useState<ActiveButtonState>('allUsers');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleButtonClick = (buttonName: ActiveButtonState) => {
    setActiveButton(buttonName);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const nextPage = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (data?.previous) {
      setPage((prev) => prev - 1);
    }
  };

  const updateTable = async () => {
    const statusMap = {
      online: true,
      offline: false,
      allUsers: undefined,
    };
    const isOnline = statusMap[activeButton]; // Directly use mapping, undefined if not matched
    const responseData = await getUsersFilter(page, isOnline, searchQuery);
    setData(responseData);
  };

  // Update data when choosing user status button and changing page
  useEffect(() => {
    updateTable();
  }, [page, activeButton]);

  // Update data when searching with query
  // Create a debounced version of updateTable
  const debouncedUpdateTable = debounce(updateTable, 500); // 500ms delay
  useEffect(() => {
    debouncedUpdateTable();
  }, [searchQuery]);

  return (
    <ContentWrapper title="TABEL PENGGUNA">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            onClick={() => handleButtonClick('allUsers')}
            className={`button button-primary-1 mx-2 ${activeButton === 'allUsers' ? 'active' : ''}`}
          >
            Semua
          </button>
          <button
            onClick={() => handleButtonClick('online')}
            className={`button button-primary-1 mx-2 ${activeButton === 'online' ? 'active' : ''}`}
          >
            Online
          </button>
          <button
            onClick={() => handleButtonClick('offline')}
            className={`button button-primary-1 mx-2 ${activeButton === 'offline' ? 'active' : ''}`}
          >
            Offline
          </button>
        </div>
        <div style={{ maxWidth: '15rem' }}>
          <input
            type="text"
            placeholder="Cari Pengguna..."
            className="form-control"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="table-container mb-3">
        <table className="table" style={{ minWidth: '50rem' }}>
          <thead>
            <tr>
              <th scope="col">Nama Lengkap</th>
              <th scope="col">Posisi</th>
              <th scope="col">Email</th>
              <th scope="col">Nomor Telepon</th>
              <th scope="col">Status</th>
              <th scope="col">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {data?.results.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Data Tidak Ditemukan
                </td>
              </tr>
            ) : (
              data?.results.map((item) => {
                return (
                  <tr key={item.id} className="table-row">
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.position}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>
                      <OnlineStatus
                        isOnline={item.is_online}
                        lastLogin={item.last_login}
                      />
                    </td>
                    <td>{!item.is_online && formatDate(item.last_login)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-start">
        <div className="d-flex align-content-center align-items-center">
          <button className="button button-rounded-light" onClick={prevPage}>
            <FontAwesomeIcon icon={faChevronLeft} fontSize={14} />
          </button>
          <div className="mx-3" style={{ padding: '7px 0px' }}>
            <span className="fw-bold" style={{ fontSize: 18 }}>
              {page}
            </span>
          </div>
          <button className="button button-rounded-light" onClick={nextPage}>
            <FontAwesomeIcon icon={faChevronRight} fontSize={14} />
          </button>
          <p className="mx-3 fst-italic">
            Page {page} of {data?.max_pages}
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default UsersTable;
