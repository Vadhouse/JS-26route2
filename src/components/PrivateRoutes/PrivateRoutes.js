import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default PrivateRoutes;
