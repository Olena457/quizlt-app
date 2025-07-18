import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectorsAuth.js';

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/start',
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log('isLoggedIn: ', isLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
