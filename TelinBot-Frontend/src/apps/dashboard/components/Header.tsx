import SearchBar from '@/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/auth/RootState';

function Header() {
  const { last_name, position } = useSelector(
    (state: RootState) => state.auth.user
  );

  return (
    <div className="dashboard-header">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={faUser}
          className="icon-rounded bg-color-primary me-3"
        />
        <div className="d-flex flex-column">
          <span className="fs-rg">
            <strong>{last_name}</strong>
          </span>
          <span className="fs-md-1 text-secondary">{position}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
