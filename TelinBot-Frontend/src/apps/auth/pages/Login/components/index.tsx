// Import Dependencies
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Import Assets
import companyLogo from '@/assets/Xabiru B.png';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Import Types
import type { Dispatch } from 'redux';
import { RootState } from '@/types/auth/RootState';
import { UserLoginState } from '@/types/auth/UserLoginState';
// Reducers
import { loginUser } from '@/reducers/auth';
import { login } from '@/services/auth';
import ErrorModal from '@/components/ErrorModal';
import { validateLogin } from '@/apps/auth/validations';
import SuccessModal from '@/components/SucessModal';
import Swal from 'sweetalert2';

function Main() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  //  Menampung value dari input form
  const [input, setInput] = useState<UserLoginState>({
    email: '',
    password: '',
  });
  //  Menampung error message validasi form
  const [inputErrors, setInputErrors] = useState<UserLoginState>({
    email: '',
    password: '',
  });

  const [isErrorModalActive, setIsErrorModalActive] = useState(false);
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: Dispatch = useDispatch();

  const errorModalToggler = () => {
    setIsErrorModalActive(!isErrorModalActive);
  };
  const successModalToggler = () => {
    setIsSuccessModalActive(!isSuccessModalActive);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitEvent = async (e: FormEvent) => {
    e.preventDefault();

    const errorValidation = validateLogin(input);
    setInputErrors(errorValidation);

    const hasErrors = Object.values(errorValidation).some(
      (value) => value !== ''
    );

    if (!hasErrors) {
      try {
        const token = await login(input);
        dispatch(loginUser(token));

        // Show success SweetAlert
        Swal.fire({
          title: 'Berhasil',
          text: 'Anda telah berhasil login!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        // const token = await login(input);
        // dispatch(loginUser(token));
        // setIsSuccessModalActive(true); // Set modal success to true
        // } catch (error) {
        //   setIsErrorModalActive(true);
      } catch (error) {
        // Show error SweetAlert
        Swal.fire({
          title: 'Gagal',
          text: 'Terjadi Kesalahan. Silahkan coba lagi!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    setInputErrors({
      ...inputErrors,
      [name]: false,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div style={{ minWidth: 450 }}>
        <div className="auth-container d-flex flex-column p-5">
          <h1 className="text-color-primary text-center mb-2 fw-bold">LOGIN</h1>
          <a href="/" className="align-self-center mb-4">
            <img
              src={companyLogo}
              alt=""
              className=""
              style={{ width: '200px' }}
            />
          </a>
          <form onSubmit={handleSubmitEvent} className="d-flex flex-column">
            <div className="mb-4">
              <div className="input-with-icon">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="form-control-icon"
                />
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  placeholder="Alamat Email"
                  className={`form-control ${inputErrors.email ? 'error-input' : ''}`}
                  onChange={handleInput}
                />
              </div>
              {inputErrors.email && (
                <p className="input-error-message">{inputErrors.email}</p>
              )}
            </div>
            <div className="mb-3">
              <div className="input-with-icon position-relative">
                <FontAwesomeIcon icon={faLock} className="form-control-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password-input"
                  name="password"
                  placeholder="Password"
                  className={`form-control ${inputErrors.password ? 'error-input' : ''}`}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary position-absolute"
                  onClick={toggleShowPassword}
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {inputErrors.password && (
                  <p className="input-error-message">{inputErrors.password}</p>
                )}
              </div>
            </div>
            <button type="submit" className="button button-primary mt-2">
              Masuk
            </button>
          </form>
          <div className="d-flex justify-content-center mt-4">
            <p style={{ fontSize: 14 }}>
              Belum memiliki akun? &nbsp;
              <a href="/auth/register" className=" text-primary">
                Buat akun sekarang
              </a>
            </p>
          </div>
        </div>

        {/* {isErrorModalActive && (
          <ErrorModal
            errorTitle="Failed to Login"
            errorMessage="Please provide a valid input"
            onModalToggle={errorModalToggler}
          />
        )}
        {isSuccessModalActive && (
          <SuccessModal
            successTitle="Login Berhasil"
            successMessage="You have logged in successfully!"
            onModalToggle={successModalToggler}
          />
        )} */}
      </div>
    );
  }
}

export default Main;
