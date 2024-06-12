interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobPosition: string;
  password: string;
  passwordConfirm: string;
}
//validasi kosong
const validateRegister = (inputData: RegisterForm) => {
  let errorMessages = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    jobPosition: '',
    password: '',
    passwordConfirm: '',
  };
  //validasi email
  if (inputData.phoneNumber.length < 8) {
    errorMessages.phoneNumber =
      'Nomor telepon terlalu pendek. Minimal panjang karakter adalah 8';
  } else if (inputData.phoneNumber.length > 15) {
    errorMessages.phoneNumber =
      'Nomor telepon terlalu panjang. maksimal panjang karakter adalah 15';
  }

  if (inputData.password.length < 8) {
    errorMessages.password =
      'Password setidaknya memiliki karakter sepanjang 8';
  }

  if (inputData.password !== inputData.passwordConfirm) {
    errorMessages.passwordConfirm = 'Password tidak sesuai';
  }

  Object.keys(inputData).forEach((key) => {
    if (inputData[key as keyof RegisterForm] === '') {
      errorMessages[key as keyof RegisterForm] = 'Input tidak dapat kosong';
    }
  });

  return errorMessages;
};

export default validateRegister;
