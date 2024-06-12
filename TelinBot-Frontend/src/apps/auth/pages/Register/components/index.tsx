import PhoneInput from '@/components/PhoneInput';
import { register } from '@/services/auth';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { validateRegister } from '@/apps/auth/validations';
import SuccessModal from '@/components/SucessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobPosition: string;
  password: string;
  passwordConfirm: string;
}

const initialRegisterForm: RegisterForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  jobPosition: '',
  password: '',
  passwordConfirm: '',
};

function Main() {
  // Menampung Value dari Input
  const [formInputData, setFormInputData] =
    useState<RegisterForm>(initialRegisterForm);
  // Menampung Error Message validasi
  const [inputErrors, setInputErrors] =
    useState<RegisterForm>(initialRegisterForm);
  const [isUserAgree, setIsUserAgree] = useState(false);
  const navigate = useNavigate();
  //validasi sukses
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setError = (inputKey: string, value: string) => {
    setInputErrors((prev) => ({
      ...prev,
      [inputKey]: value,
    }));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormInputData({
      ...formInputData,
      [name]: value,
    });

    setInputErrors({
      ...inputErrors,
      [name]: false,
    });
  };

  const handlePhoneInput = (phoneNumber: string) => {
    setFormInputData({
      ...formInputData,
      phoneNumber: phoneNumber,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errorValidation = validateRegister(formInputData);
    setInputErrors(errorValidation);

    const hasErrors = Object.values(errorValidation).some(
      (value) => value !== ''
    );

    if (!hasErrors && isUserAgree) {
      // User Register API
      const result = await Swal.fire({
        title: 'Apakah Kamu Yakin?',
        text: 'Ingin Registrasi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, registrasi!',
        cancelButtonText: 'Tidak!',
      });
      if (result.isConfirmed) {
        try {
          await register(
            formInputData.firstName,
            formInputData.lastName,
            formInputData.email,
            formInputData.phoneNumber,
            formInputData.password,
            formInputData.jobPosition
          );
          //validasi
          setIsSuccessModalActive(true); // Set modal success to true
          // navigate('/auth/login', { replace: true });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 409) {
              setError('email', 'Email already exist');
            }
          }
        }
      }
    }
  };
  //validasi
  const successModalToggler = () => {
    setIsSuccessModalActive(!isSuccessModalActive);
    navigate('/auth/login'); // Redirect to login page after closing the modal
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isUserAgree) {
      e.preventDefault();
      Swal.fire({
        title: 'Perhatian',
        text: 'Informasi pribadi yang Anda berikan kepada kami akan diproses sesuai dengan kebijakan privasi kami. Dengan menggunakan layanan Xabiru Bot ini, Anda menyetujui pengumpulan dan penggunaan informasi ini sebagaimana diatur dalam kebijakan privasi.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="auth-container d-flex flex-column p-5">
      <h1 className="text-color-primary text-center mb-4 fw-bold">REGISTER</h1>
      <form action="" className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-6">
            <label htmlFor="firstName" className="form-label">
              Nama Depan
            </label>
            <input
              type="text"
              className={`form-control ${inputErrors.firstName ? 'error-input' : ''}`}
              id="firstName"
              name="firstName"
              onChange={handleInput}
            />
            {inputErrors.firstName && (
              <p className="input-error-message">{inputErrors.firstName}</p>
            )}
          </div>
          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Nama Belakang
            </label>
            <input
              type="text"
              className={`form-control ${inputErrors.lastName ? 'error-input' : ''}`}
              id="lastName"
              name="lastName"
              onChange={handleInput}
            />
            {inputErrors.lastName && (
              <p className="input-error-message">{inputErrors.lastName}</p>
            )}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Alamat Email
          </label>
          <input
            type="email"
            className={`form-control ${inputErrors.email ? 'error-input' : ''}`}
            id="email"
            name="email"
            onChange={handleInput}
            aria-describedby="emailHelp"
          />
          {inputErrors.email && (
            <p className="input-error-message">{inputErrors.email}</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="form-label">
            Nomor Telepon
          </label>
          <PhoneInput
            onChange={handlePhoneInput}
            //error jika inputannya kosong
            isError={inputErrors.phoneNumber !== ''}
          />
          {inputErrors.phoneNumber && (
            <p className="input-error-message">{inputErrors.phoneNumber}</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="jobPosition" className="form-label">
            Posisi Pekerjaan
          </label>
          <input
            type="text"
            className={`form-control ${inputErrors.jobPosition ? 'error-input' : ''}`}
            id="jobPosition"
            name="jobPosition"
            onChange={handleInput}
          />
          {inputErrors.jobPosition && (
            <p className="input-error-message">{inputErrors.jobPosition}</p>
          )}
        </div>
        <div className="row mb-2">
          <div className="col-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={handleInput}
                className={`form-control ${inputErrors.password ? 'error-input' : ''}`}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleShowPassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {inputErrors.password && (
              <p className="input-error-message">{inputErrors.password}</p>
            )}
          </div>
          <div className="col-6">
            <label htmlFor="passwordConfirm" className="form-label">
              Konfirmasi Password
            </label>
            <div className="input-group">
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                className={`form-control ${inputErrors.passwordConfirm ? 'error-input' : ''}`}
                onChange={handleInput}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleShowPassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {inputErrors.passwordConfirm && (
              <p className="input-error-message">
                {inputErrors.passwordConfirm}
              </p>
            )}
          </div>
        </div>
        <div className="mb-2 mt-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={isUserAgree}
            onChange={() => {
              setIsUserAgree(!isUserAgree);
            }}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Saya menyetujui{' '}
            <a
              href=""
              className="text-primary link-underline"
              onClick={handleTermsClick}
            >
              syarat dan ketentuan
            </a>
          </label>
        </div>
        <button type="submit" className="mt-3 button button-primary mt-2">
          Daftar
        </button>
        <div className="d-flex justify-content-center mt-4">
          <p style={{ fontSize: 14 }}>
            Sudah memiliki akun? &nbsp;
            <a href="/auth/login" className=" text-primary">
              Login disini
            </a>
          </p>
        </div>
      </form>
      {/* notifikasi register */}
      {isSuccessModalActive && (
        <SuccessModal
          successTitle="Berhasil"
          successMessage="Anda telah berhasil mendaftar!."
          onModalToggle={successModalToggler}
        />
      )}
    </div>
  );
}

export default Main;
