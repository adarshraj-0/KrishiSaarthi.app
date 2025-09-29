
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, FileText } from "lucide-react";
import { NegotiationDialog } from '@/components/business/negotiation-dialog';
import { useRouter } from 'next/navigation';

export default function BusinessDashboardPage() {
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Business Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Search className="mr-2 h-5 w-5"/> Bulk Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Search for crops by region to make bulk purchases.</p>
          <div className="flex gap-2">
            <Input placeholder="Search crops..." />
            <Input placeholder="Enter region..." />
            <Button onClick={() => router.push('/business/orders')}>Search</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-5 w-5"/> Pre-booking & Negotiation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Send pre-booking requests and negotiate prices directly with farmers.</p>
            <Button className="w-full" onClick={() => setIsNegotiationOpen(true)}>Start Negotiation</Button>
            <div className="mt-4 h-48 bg-muted rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Dummy chat interface</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5"/> Contract Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">View and manage your active contracts with farmers.</p>
            <div className="border rounded-md">
                <div className="p-4 border-b">
                    <h3 className="font-semibold">Contract #C-1024</h3>
                    <p className="text-sm text-muted-foreground">Farmer: Ram Singh, Crop: Wheat, Status: Active</p>
                </div>
                 <div className="p-4">
                    <h3 className="font-semibold">Contract #C-1023</h3>
                    <p className="text-sm text-muted-foreground">Farmer: Sita Devi, Crop: Tomatoes, Status: Completed</p>
                </div>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => router.push('/business/contracts')}>Download Invoices</Button>
          </CardContent>
        </Card>
      </div>

      <NegotiationDialog isOpen={isNegotiationOpen} onOpenChange={setIsNegotiationOpen} />
    </div>
  );
}

