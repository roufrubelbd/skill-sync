import { Navigate, useLocation } from 'react-router'
import useAuth from '../hooks/useAuth'
import LottieLoader from '../components/LottieLoader'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LottieLoader />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute