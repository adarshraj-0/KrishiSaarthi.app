
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bell, FileText, Users, ShoppingCart, DollarSign, LineChart } from "lucide-react";
import { AdminSalesChart } from "@/components/admin/sales-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const kpis = [
  { title: 'Total Orders', value: '1,250', icon: ShoppingCart },
  { title: 'Farmers Onboard', value: '350', icon: Users },
  { title: 'Total Revenue', value: '₹4,50,000', icon: DollarSign },
  { title: 'Active Users', value: '1,500', icon: LineChart },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>Generate Report</Button>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><BarChart className="mr-2 h-5 w-5"/> Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminSalesChart />
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Users className="mr-2 h-5 w-5"/> Farmer Onboarding Requests</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">List of pending farmer approvals.</p>
             {/* Placeholder for farmer requests list */}
             <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">Ramesh Kumar</p>
                        <p className="text-sm text-muted-foreground">Nashik, Maharashtra</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button size="sm">Approve</Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">Priya Sharma</p>
                        <p className="text-sm text-muted-foreground">Mysuru, Karnataka</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button size="sm">Approve</Button>
                    </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Bell className="mr-2 h-5 w-5"/> System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Broadcast messages or view system alerts.</p>
             <Button className="mt-4 w-full">Send Notification</Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><FileText className="mr-2 h-5 w-5"/> Export Reports</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Generate and download system reports.</p>
             <Button variant="outline" className="mt-4 w-full">Download Reports</Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Users className="mr-2 h-5 w-5"/> Manage Coordinators</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">View and manage coordinator profiles.</p>
             <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/admin/users">View Coordinators</Link>
            </Button>
          </CardContent>
        </Card>
       </div>
    </div>
  );
}
