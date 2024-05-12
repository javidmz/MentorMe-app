import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

const ProtectedRoute = () => {
  const { userInfo } = useUserInfo();
  const location = useLocation();

  return userInfo?.role === "USER" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
