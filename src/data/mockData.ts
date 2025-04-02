
// Mock data for company dashboard
export const companyListings = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    industry: "Software",
    status: "Active",
    location: "San Francisco, CA",
    revenue: 2500000,
    ebitda: 750000,
    employees: 25,
    foundedYear: 2015,
    askingPrice: 7500000,
    description: "B2B SaaS platform for project management",
    viewsThisMonth: 34,
    inquiriesThisMonth: 5
  },
  {
    id: 2,
    name: "Green Manufacturing Co.",
    industry: "Manufacturing",
    status: "Under Review",
    location: "Detroit, MI",
    revenue: 5700000,
    ebitda: 1200000,
    employees: 48,
    foundedYear: 2009,
    askingPrice: 12000000,
    description: "Sustainable manufacturing solutions",
    viewsThisMonth: 22,
    inquiriesThisMonth: 3
  },
  {
    id: 3,
    name: "Health Services LLC",
    industry: "Healthcare",
    status: "Active",
    location: "Boston, MA",
    revenue: 3800000,
    ebitda: 950000,
    employees: 32,
    foundedYear: 2012,
    askingPrice: 9500000,
    description: "Healthcare staffing solutions",
    viewsThisMonth: 41,
    inquiriesThisMonth: 7
  }
];

// Mock data for investor dashboard
export const investmentOpportunities = [
  {
    id: 101,
    companyName: "Retail Chain Inc.",
    industry: "Retail",
    location: "Chicago, IL",
    revenue: 8500000,
    ebitdaMargin: 18,
    askingPrice: 22000000,
    growthRate: 12,
    status: "New Listing",
    matchScore: 87
  },
  {
    id: 102,
    companyName: "Logistics Solutions",
    industry: "Transportation",
    location: "Atlanta, GA",
    revenue: 12700000,
    ebitdaMargin: 22,
    askingPrice: 38000000,
    growthRate: 15,
    status: "In Discussion",
    matchScore: 92
  },
  {
    id: 103,
    companyName: "Cloud Services Pro",
    industry: "Technology",
    location: "Seattle, WA",
    revenue: 4200000,
    ebitdaMargin: 28,
    askingPrice: 16800000,
    growthRate: 24,
    status: "Due Diligence",
    matchScore: 95
  },
  {
    id: 104,
    companyName: "Food Distribution Co.",
    industry: "Food & Beverage",
    location: "Dallas, TX",
    revenue: 7800000,
    ebitdaMargin: 15,
    askingPrice: 18000000,
    growthRate: 8,
    status: "New Listing",
    matchScore: 78
  },
  {
    id: 105,
    companyName: "Marketing Agency Group",
    industry: "Marketing",
    location: "New York, NY",
    revenue: 3200000,
    ebitdaMargin: 24,
    askingPrice: 9600000,
    growthRate: 18,
    status: "New Listing",
    matchScore: 84
  }
];

// Mock chart data for company dashboard
export const companyChartData = {
  viewsTrend: [
    { name: "Jan", views: 12 },
    { name: "Feb", views: 19 },
    { name: "Mar", views: 15 },
    { name: "Apr", views: 27 },
    { name: "May", views: 34 },
    { name: "Jun", views: 42 }
  ],
  inquiriesTrend: [
    { name: "Jan", inquiries: 2 },
    { name: "Feb", inquiries: 4 },
    { name: "Mar", inquiries: 3 },
    { name: "Apr", inquiries: 5 },
    { name: "May", inquiries: 7 },
    { name: "Jun", inquiries: 5 }
  ],
  inquiryByIndustry: [
    { name: "Private Equity", value: 45 },
    { name: "Strategic Buyers", value: 30 },
    { name: "Family Office", value: 15 },
    { name: "Individual", value: 10 }
  ]
};

// Mock chart data for investor dashboard
export const investorChartData = {
  dealsByIndustry: [
    { name: "Technology", value: 35 },
    { name: "Healthcare", value: 25 },
    { name: "Manufacturing", value: 20 },
    { name: "Retail", value: 15 },
    { name: "Other", value: 5 }
  ],
  dealsBySize: [
    { name: "<$5M", value: 15 },
    { name: "$5M-$10M", value: 30 },
    { name: "$10M-$25M", value: 35 },
    { name: "$25M-$50M", value: 15 },
    { name: ">$50M", value: 5 }
  ],
  pipelineTrend: [
    { name: "Q1", newDeals: 8, closedDeals: 2 },
    { name: "Q2", newDeals: 12, closedDeals: 5 },
    { name: "Q3", newDeals: 15, closedDeals: 7 },
    { name: "Q4", newDeals: 10, closedDeals: 4 }
  ]
};
