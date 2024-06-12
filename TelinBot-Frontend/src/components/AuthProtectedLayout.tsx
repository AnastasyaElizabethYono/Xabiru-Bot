import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@/types/auth/RootState';
import { verifyToken } from '@/services/auth';
import { resetState } from '@/reducers/auth';

interface ProtectedLayoutProps {
  allowedGroups?: string[];
}

function ProtectedLayout({
  allowedGroups = [],
}: Readonly<ProtectedLayoutProps>) {
  const refreshToken = useSelector(
    (state: RootState) => state.auth.token?.refresh
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const response = await verifyToken(refreshToken);
      const statusCode = response.status;
      if (statusCode === 401) {
        dispatch(resetState());
      }
    };
    checkToken();
  }, [dispatch, navigate, refreshToken]);

  const { groups } = useSelector((state: RootState) => state.auth.user);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const hasPermission = groups.some((group) => allowedGroups.includes(group));

  if (hasPermission) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedLayout;
