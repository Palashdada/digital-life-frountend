import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import Loading from "../../pages/Loading";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" />;

  // Optional: admin-only route
  if (adminOnly && user?.role !== "admin") return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
