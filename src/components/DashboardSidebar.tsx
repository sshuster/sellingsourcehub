
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  Search,
  MessageSquare,
  FileText,
  Settings,
  Users,
  PieChart,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Building2
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isCompanyOwner = user?.type === "company";
  
  const navigation = isCompanyOwner
    ? [
        { name: "Dashboard", href: "/company-dashboard", icon: LayoutDashboard },
        { name: "My Listings", href: "/company-listings", icon: Building },
        { name: "Investor Matches", href: "/company-matches", icon: Users },
        { name: "Messages", href: "/company-messages", icon: MessageSquare },
        { name: "Documents", href: "/company-documents", icon: FileText },
        { name: "Settings", href: "/company-settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", href: "/investor-dashboard", icon: LayoutDashboard },
        { name: "Search Companies", href: "/investor-search", icon: Search },
        { name: "My Portfolio", href: "/investor-portfolio", icon: PieChart },
        { name: "Deal Pipeline", href: "/investor-pipeline", icon: Building2 },
        { name: "Messages", href: "/investor-messages", icon: MessageSquare },
        { name: "Settings", href: "/investor-settings", icon: Settings },
      ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-lg text-dealBlue">DealFlow</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-8 w-8",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 py-6">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-dealBlue-light bg-opacity-10 text-dealBlue"
                    : "text-gray-600 hover:bg-gray-100",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon className={cn(
                  "flex-shrink-0 h-5 w-5",
                  isActive ? "text-dealBlue" : "text-gray-500"
                )} />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dealBlue text-white flex items-center justify-center">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {isCompanyOwner ? "Company Owner" : "PE Investor"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
