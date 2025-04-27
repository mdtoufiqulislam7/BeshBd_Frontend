import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is array, check if user.role is included
  if (Array.isArray(role)) {
    if (!role.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  } else {
    // Single role
    if (user.role !== role) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;