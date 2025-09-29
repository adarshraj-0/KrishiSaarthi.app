
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, DollarSign, Package, TrendingUp, BarChart as BarChartIcon } from "lucide-react";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const salesData = [
  { month: 'Jan', revenue: 120000, orders: 450 },
  { month: 'Feb', revenue: 180000, orders: 600 },
  { month: 'Mar', revenue: 220000, orders: 750 },
  { month: 'Apr', revenue: 250000, orders: 820 },
  { month: 'May', revenue: 310000, orders: 950 },
  { month: 'Jun', revenue: 290000, orders: 900 },
];

const userGrowthData = [
  { month: 'Jan', farmers: 50, consumers: 300, businesses: 20 },
  { month: 'Feb', farmers: 65, consumers: 450, businesses: 25 },
  { month: 'Mar', farmers: 80, consumers: 600, businesses: 30 },
  { month: 'Apr', farmers: 100, consumers: 780, businesses: 38 },
  { month: 'May', farmers: 125, consumers: 950, businesses: 45 },
  { month: 'Jun', farmers: 150, consumers: 1100, businesses: 55 },
];


export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Platform Analytics</h1>

             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,500</div>
                        <p className="text-xs text-muted-foreground">+50 since last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹11,70,000</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4,470</div>
                        <p className="text-xs text-muted-foreground">+201 since last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+18.5%</div>
                        <p className="text-xs text-muted-foreground">This quarter</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue & Orders</CardTitle>
                        <CardDescription>Last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" stroke="hsl(var(--primary))" />
                                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent-foreground))" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}/>
                                <Legend />
                                <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" name="Revenue (₹)" />
                                <Bar yAxisId="right" dataKey="orders" fill="hsl(var(--secondary))" name="Orders" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>Last 6 months by role</CardDescription>
                    </CardHeader>
                    <CardContent className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}/>
                                <Legend />
                                <Bar dataKey="farmers" stackId="a" fill="hsl(var(--primary))" name="Farmers" />
                                <Bar dataKey="consumers" stackId="a" fill="hsl(var(--secondary))" name="Consumers" />
                                <Bar dataKey="businesses" stackId="a" fill="hsl(var(--muted-foreground))" name="Businesses" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
