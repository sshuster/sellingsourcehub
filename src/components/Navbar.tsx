
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Building, LogOut, Users } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-dealBlue text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          DealFlow
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center mr-4 text-sm">
                <span className="mr-2">Welcome, {user?.name}</span>
                {user?.type === "company" ? (
                  <Building className="h-4 w-4" />
                ) : (
                  <Users className="h-4 w-4" />
                )}
              </div>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-dealBlue-hover"
                onClick={() => {
                  if (user?.type === "company") {
                    navigate("/company-dashboard");
                  } else {
                    navigate("/investor-dashboard");
                  }
                }}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-dealBlue-hover"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-dealBlue-hover">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dealBlue">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
