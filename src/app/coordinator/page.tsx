import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Truck, MapPin, MessageSquare, ShieldAlert, CheckCircle, BarChart } from "lucide-react";

const overviewStats = [
  { title: "Active Farmers", value: "42", icon: Users },
  { title: "Pending Orders", value: "18", icon: Truck },
  { title: "Available Vehicles", value: "7", icon: Truck },
  { title: "Support Requests", value: "3", icon: ShieldAlert },
];

export default function CoordinatorDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Coordinator Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5"/> Village Map</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Farmers pinned on map with crop readiness.</p>
              <div className="relative w-full h-96 bg-muted rounded-md overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04363249673!2d73.79292694968846!3d18.52456488422321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Village Map"
                ></iframe>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Truck className="mr-2 h-5 w-5"/> Shipment Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Create new shipments and assign vehicles.</p>
              <Button>Create Shipment</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><BarChart className="mr-2 h-5 w-5"/> Village Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="font-semibold">Top Farmer: Ram Singh (45 Orders)</p>
                <p className="font-semibold">Monthly Revenue: ₹85,000</p>
                <p className="font-semibold">Total Deliveries: 152</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5"/> Farmer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Approve/reject new farmer onboarding requests.</p>
              <div className="flex justify-between items-center p-2 border rounded-md">
                <span>Request from "Shyam Lal"</span>
                <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8 text-green-600"><CheckCircle className="h-4 w-4"/></Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 text-red-600"><ShieldAlert className="h-4 w-4"/></Button>
                </div>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-5 w-5"/> Chat & Support</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Dummy chat interface</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
