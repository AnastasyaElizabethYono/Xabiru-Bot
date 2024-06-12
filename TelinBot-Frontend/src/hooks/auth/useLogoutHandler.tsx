import { logoutUser } from '@/reducers/auth';
import { RootState } from '@/types/auth/RootState';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogoutHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return handleLogout;
};

export default useLogoutHandler;
