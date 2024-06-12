import companyLogo from '@/assets/Xabiru B.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faBars,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useLogoutHandler } from '@/hooks/auth';
import { useState } from 'react';

function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const logout = useLogoutHandler();

  const toggleSidebar = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={`sidebar-container ${!isActive ? 'collapsed' : ''}`}>
      <aside className={`sidebar ${!isActive ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <a href="/dashboard" className="sidebar-logo">
            <img src={companyLogo} alt="" className="sidebar-logo" />
          </a>
        </div>
        <div className="sidebar-link">
          {/* <a href="/dashboard" className="sidebar-item">
            <FontAwesomeIcon icon={faChartSimple} className="sidebar-icon" />
            <span>Data</span>
          </a> */}
          <a href="/dashboard/users" className="sidebar-item">
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Pengguna</span>
          </a>
          {/* <a href="/dashboard/finance" className="sidebar-item">
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              className="sidebar-icon"
            />
            <span>Keuangan</span>
          </a> */}
          {/* <a href="/dashboard/frequently-asked" className="sidebar-item">
            <FontAwesomeIcon icon={faCircleQuestion} className="sidebar-icon" />
            <span>FAQ</span>
          </a> */}
        </div>
        <div className="sidebar-footer">
          <button className="button button-primary" onClick={logout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="button-icon"
            />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
      <div id="sidebar-toggle-icon">
        <button className="button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="icon-rounded" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
