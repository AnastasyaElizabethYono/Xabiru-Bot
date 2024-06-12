import { User, Finance, Question } from '@/apps/dashboard/pages';
import { AuthProtectedLayout } from '../components';
import Overview from '@/apps/dashboard/pages/Overview';
import { Navigate } from 'react-router-dom';

const DashboardRoot = () => {
  return <Navigate to={'/dashboard/users'} replace />;
};

export const dashboardRoutes = {
  path: 'dashboard',
  element: <AuthProtectedLayout allowedGroups={['Admin']} />,
  children: [
    { index: true, element: <DashboardRoot /> },
    { path: 'users', element: <User /> },
    // { path: 'frequently-asked', element: <Question /> },
  ],
};
