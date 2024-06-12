import { Login, Register } from '@/apps/auth/pages';

export const authRoutes = {
  path: '/',
  children: [
    { path: 'auth/login', element: <Login /> },
    { path: 'auth/register', element: <Register /> },
  ],
};
