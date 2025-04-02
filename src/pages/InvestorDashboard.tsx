
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Building, Filter, Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { investmentOpportunities, investorChartData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// AG Grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

// Define AG Grid column definitions
const columnDefs: ColDef[] = [
  { field: "companyName", headerName: "Company", flex: 2, sortable: true, filter: true },
  { field: "industry", headerName: "Industry", flex: 1, sortable: true, filter: true },
  { field: "location", headerName: "Location", flex: 1, sortable: true, filter: true },
  { 
    field: "revenue", 
    headerName: "Revenue", 
    flex: 1,
    sortable: true, 
    filter: true,
    valueFormatter: (params) => {
      return params.value ? `$${params.value.toLocaleString()}` : "";
    }
  },
  { 
    field: "ebitdaMargin", 
    headerName: "EBITDA %", 
    flex: 1,
    sortable: true, 
    filter: true,
    valueFormatter: (params) => {
      return params.value ? `${params.value}%` : "";
    }
  },
  { field: "status", headerName: "Status", flex: 1, sortable: true, filter: true },
  { 
    field: "matchScore", 
    headerName: "Match", 
    flex: 1,
    sortable: true,
    valueFormatter: (params) => {
      return params.value ? `${params.value}%` : "";
    },
    cellStyle: (params) => {
      const score = params.value;
      if (score >= 90) return { color: '#059669', fontWeight: 'bold' };
      if (score >= 80) return { color: '#0284c7', fontWeight: 'bold' };
      return { color: '#6b7280' };
    }
  }
];

// Colors for charts
const COLORS = ["#0A2463", "#3E92CC", "#57B8FF", "#A2D2FF", "#D6E4F0"];

const InvestorDashboard = () => {
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
  const totalOpportunities = investmentOpportunities.length;
  const highMatchOpportunities = investmentOpportunities.filter(op => op.matchScore >= 90).length;
  const inProgressDeals = investmentOpportunities.filter(op => op.status !== "New Listing").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <DashboardSidebar />
        
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Investor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-dealBlue bg-opacity-10">
                    <Building className="h-6 w-6 text-dealBlue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalOpportunities}</div>
                    <p className="text-xs text-gray-500">Available investments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">High Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-dealBlue bg-opacity-10">
                    <Sparkles className="h-6 w-6 text-dealBlue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{highMatchOpportunities}</div>
                    <p className="text-xs text-gray-500">90%+ match score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-dealBlue bg-opacity-10">
                    <TrendingUp className="h-6 w-6 text-dealBlue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{inProgressDeals}</div>
                    <p className="text-xs text-gray-500">Deals in pipeline</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Deals by Industry</CardTitle>
                <CardDescription>Distribution of investment opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investorChartData.dealsByIndustry}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {investorChartData.dealsByIndustry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => `${value}% of deals`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Trend</CardTitle>
                <CardDescription>New and closed deals by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investorChartData.pipelineTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="newDeals" name="New Deals" fill="#0A2463" />
                      <Bar dataKey="closedDeals" name="Closed Deals" fill="#3E92CC" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AG Grid Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Matching Opportunities</CardTitle>
                <CardDescription>Companies that match your investment criteria</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-dealBlue text-dealBlue">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-dealBlue hover:bg-dealBlue-hover">
                  <Search className="h-4 w-4 mr-2" />
                  Find Companies
                </Button>
              </div>
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
                  rowData={investmentOpportunities}
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

export default InvestorDashboard;
