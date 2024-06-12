import { Landing, Organisasi } from '@/apps/company-profile/pages';
import { AuthLayout } from '../components';

export const companyProfileRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    { index: true, element: <Landing /> },
    { path: 'organization', element: <Organisasi /> },
  ],
};
