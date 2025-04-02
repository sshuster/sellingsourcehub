
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    } else if (!loading && isAuthenticated && userType && user?.type !== userType) {
      // If specific user type is required and doesn't match
      if (user?.type === "company") {
        navigate("/company-dashboard");
      } else if (user?.type === "investor") {
        navigate("/investor-dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, loading, navigate, user, userType]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
