import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/admin/blog/login");
    }
  }, [navigate]);

  return authService.isAuthenticated() ? <>{children}</> : null;
};

export default ProtectedRoute;
