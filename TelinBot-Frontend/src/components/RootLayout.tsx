import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/auth/RootState';

const RootLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const groups = useSelector((state: RootState) => state.auth.user.groups);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (groups.includes('Admin')) {
    return <Navigate to="/dashboard" replace />;
  } else if (groups.includes('Employee')) {
    return <Navigate to="/chatbot" replace />;
  }
};

export default RootLayout;
