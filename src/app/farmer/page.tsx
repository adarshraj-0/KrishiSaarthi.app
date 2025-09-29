
"use client";
import { AddCropForm } from "@/components/farmer/add-crop-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, ListOrdered, MessageSquare, Shield, User, Wallet } from "lucide-react";
import { mockTransactions } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MarketPricesChart } from "@/components/farmer/market-prices-chart";
import { useToast } from "@/hooks/use-toast";
import { useFarmer } from "@/context/farmer-context";
import { Crop } from "@/lib/types";

export default function FarmerDashboardPage() {
    const { toast } = useToast();
    const { addCrop } = useFarmer();

  const stats = [
    { title: "Wallet Balance", value: "₹12,500", icon: Wallet },
    { title: "Total Orders", value: "42", icon: ListOrdered },
    { title: "Monthly Revenue", value: "₹25,000", icon: DollarSign },
  ];

  const handleCropAdded = (values: any) => {
    const newCrop: Crop = {
      ...values,
      id: `crop-${Date.now()}`,
      farmerId: 'farmer-1',
      imageUrl: 'https://picsum.photos/seed/new-crop/400/300',
      imageHint: 'new crop'
    }
    addCrop(newCrop);

     toast({
      title: "Crop Added!",
      description: `${values.cropName} has been listed on the marketplace.`,
    });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AddCropForm onCropAdded={handleCropAdded} />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg"><BarChart className="mr-2 h-5 w-5"/> Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketPricesChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg"><Shield className="mr-2 h-5 w-5"/> Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Active Policy: CropSure Plan #123</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <div className="font-medium">{tx.description}</div>
                                        <div className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={tx.status === 'Confirmed' ? 'default' : 'secondary'}>{tx.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">₹{tx.amount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg"><User className="mr-2 h-5 w-5"/> My Coordinator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">Suresh Kumar</p>
                    <p className="text-sm text-muted-foreground">Contact: +91 9876543210</p>
                    <p className="text-sm text-muted-foreground mt-2">Update: Vehicle assigned for tomorrow's pickup.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg"><MessageSquare className="mr-2 h-5 w-5"/> Help & Chat</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Dummy Chat Interface</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
