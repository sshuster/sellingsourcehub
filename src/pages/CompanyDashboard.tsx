
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Eye, MessageSquare, PlusCircle, TrendingUp } from "lucide-react";
import { companyListings, companyChartData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// AG Grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

// Define AG Grid column definitions
const columnDefs: ColDef[] = [
  { field: "name", headerName: "Company Name", flex: 2, sortable: true, filter: true },
  { field: "status", headerName: "Status", flex: 1, sortable: true, filter: true },
  { 
    field: "revenue", 
    headerName: "Annual Revenue", 
    flex: 1,
    sortable: true, 
    filter: true,
    valueFormatter: (params) => {
      return params.value ? `$${params.value.toLocaleString()}` : "";
    }
  },
  { 
    field: "askingPrice", 
    headerName: "Asking Price", 
    flex: 1,
    sortable: true, 
    filter: true,
    valueFormatter: (params) => {
      return params.value ? `$${params.value.toLocaleString()}` : "";
    }
  },
  { field: "viewsThisMonth", headerName: "Views", flex: 1, sortable: true },
  { field: "inquiriesThisMonth", headerName: "Inquiries", flex: 1, sortable: true }
];

// Colors for pie chart
const COLORS = ["#0A2463", "#3E92CC", "#57B8FF", "#A2D2FF"];

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);

  // Track window width for responsive behavior
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // AG Grid ready event
  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  };

  // Calculate stats
  const totalViews = companyListings.reduce((sum, company) => sum + company.viewsThisMonth, 0);
  const totalInquiries = companyListings.reduce((sum, company) => sum + company.inquiriesThisMonth, 0);
  const totalListings = companyListings.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <DashboardSidebar />
        
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Company Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-dealBlue bg-opacity-10">
                    <AlertCircle className="h-6 w-6 text-dealBlue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalListings}</div>
                    <p className="text-xs text-gray-500">Active company listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-dealBlue bg-opacity-10">
                    <Eye className="h-6 w-6 text-dealBlue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalViews}</div>
                    <p className="text-xs text-gray-500">Views this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-dealBlue bg-opacity-10">
                    <MessageSquare className="h-6 w-6 text-dealBlue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalInquiries}</div>
                    <p className="text-xs text-gray-500">Inquiries this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Listing Views Trend</CardTitle>
                <CardDescription>Monthly views of your listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={companyChartData.viewsTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#0A2463" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inquiries by Investor Type</CardTitle>
                <CardDescription>Distribution of inquiries by investor category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={companyChartData.inquiryByIndustry}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {companyChartData.inquiryByIndustry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => `${value} inquiries`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AG Grid Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Listings</CardTitle>
                <CardDescription>Manage and monitor your company listings</CardDescription>
              </div>
              <Button className="bg-dealBlue hover:bg-dealBlue-hover">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Listing
              </Button>
            </CardHeader>
            <CardContent>
              <div 
                className="ag-theme-alpine" 
                style={{ 
                  height: 400, 
                  width: '100%'
                }}
              >
                <AgGridReact
                  rowData={companyListings}
                  columnDefs={columnDefs}
                  onGridReady={onGridReady}
                  pagination={true}
                  paginationAutoPageSize={true}
                  animateRows={true}
                  defaultColDef={{
                    resizable: true,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
