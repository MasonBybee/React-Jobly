import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../features/User";

function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user || !user.username) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
