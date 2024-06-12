import { UserLoginState } from '@/types/auth/UserLoginState';

const validateLogin = (inputData: UserLoginState) => {
  let errorMessages = {
    email: '',
    password: '',
  };

  if (inputData.email === '') errorMessages.email = 'Email tidak boleh kosong';
  if (inputData.password === '')
    errorMessages.password = 'Password tidak boleh kosong';
  return errorMessages;
};

export default validateLogin;
