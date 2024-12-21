import { useNavigate } from 'react-router-dom';

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateAfterLogin = () => {
    navigate('/');
  };

  return {
    navigateToLogin,
    navigateAfterLogin,
  };
};