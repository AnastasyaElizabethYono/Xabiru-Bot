// Import Dependencies
import { useSelector } from 'react-redux';
// Import Assets
import imageLogo from '@/assets/Telkomsel_2021_icon.svg.png';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
// Import Hooks
import { useLogoutHandler } from '@/hooks/auth';
// Import Types
import { RootState } from '@/types/auth/RootState';

const AuthenticatedUser = () => {
  const { last_name, position } = useSelector(
    (state: RootState) => state.auth.user
  );

  const logout = useLogoutHandler();

  return (
    <div className="nav-auth-container ms-auto">
      <div className="navbar-nav">
        <button onClick={logout} className="nav-link p-2">
          Logout
        </button>
        <div className="d-flex align-items-center align-self-center">
          <FontAwesomeIcon
            icon={faUser}
            className="icon-rounded bg-color-light me-3"
          />
          <div className="d-flex flex-column">
            <span className="fs-rg text-light">
              <strong>{last_name}</strong>
            </span>
            <span className="fs-md-1 text-light">{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInButton = () => {
  return (
    <div className="nav-auth-container ms-auto">
      <div className="navbar-nav">
        <a href="/auth/login" className=" nav-link">
          MASUK
        </a>
      </div>
    </div>
  );
};

function Navbar() {
  const { groups } = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <nav className="navbar navbar-expand-lg fixed-top nav company-container">
      <div className="container-fluid nav-container">
        <a
          className="navbar-brand text-light pb-2"
          href="/"
          style={{ paddingRight: '2rem' }}
        >
          <img
            src={imageLogo}
            alt="Logo"
            height="30px"
            className="d-inline-block align-text-top mx-1"
          />
          <span className="nav-brand">PT. Telekomunikasi Indonesia</span>
        </a>
        <button
          className="navbar-toggler button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav">
            <a href="/" className="nav-link p-2">
              Beranda
            </a>
            <a href="/organization" className="nav-link p-2">
              Organisasi
            </a>
            {isAuthenticated && (
              <a href="/" className="nav-link p-2">
                Laporan
              </a>
            )}
            {groups.includes('Admin') && (
              <a href="/dashboard" className="nav-link p-2">
                Dashboard
              </a>
            )}
          </div>
          {isAuthenticated ? <AuthenticatedUser /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
