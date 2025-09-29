
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, UserPlus, Filter } from "lucide-react";
import { mockFarmers } from "@/lib/mock-data";
import { Farmer } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const mockRequests: Omit<Farmer, 'crops' | 'walletBalance' | 'role'>[] = [
    { id: 'farmer-req-1', name: 'Shyam Lal', avatarUrl: 'https://picsum.photos/seed/req-1/100/100', location: 'Baramati, Maharashtra' },
    { id: 'farmer-req-2', name: 'Meena Kumari', avatarUrl: 'https://picsum.photos/seed/req-2/100/100', location: 'Indapur, Maharashtra' },
]

export default function CoordinatorFarmersPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);

  const handleRequest = (id: string, approved: boolean) => {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    setRequests(prev => prev.filter(r => r.id !== id));
    toast({
        title: `Request ${approved ? 'Approved' : 'Rejected'}`,
        description: `Onboarding request for ${request.name} has been ${approved ? 'approved' : 'rejected'}.`
    })
  }
    
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farmer Management</h1>
          <p className="text-muted-foreground">Onboard new farmers and manage your network.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filter</Button>
            <Button><UserPlus className="mr-2 h-4 w-4"/>Onboard New Farmer</Button>
        </div>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Onboarding Requests</CardTitle>
            <CardDescription>Review and approve new farmers who want to join your network.</CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Farmer</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req) => (
                            <TableRow key={req.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image src={req.avatarUrl} alt={req.name} width={40} height={40} className="rounded-full" data-ai-hint="person avatar" />
                                        <span className="font-medium">{req.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{req.location}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-green-600 border-green-600/50 hover:bg-green-50 hover:text-green-700" onClick={() => handleRequest(req.id, true)}>
                                            <Check className="mr-2 h-4 w-4" /> Approve
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-600/50 hover:bg-red-50 hover:text-red-700" onClick={() => handleRequest(req.id, false)}>
                                            <X className="mr-2 h-4 w-4" /> Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-sm text-muted-foreground">No pending onboarding requests.</p>
            )}
          </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Your Farmers</CardTitle>
           <CardDescription>A list of all farmers you are coordinating with.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Active Crops</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFarmers.map((farmer) => (
                <TableRow key={farmer.id}>
                   <TableCell>
                        <div className="flex items-center gap-3">
                            <Image src={farmer.avatarUrl} alt={farmer.name} width={40} height={40} className="rounded-full" data-ai-hint="farmer profile" />
                            <span className="font-medium">{farmer.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>{farmer.location}</TableCell>
                    <TableCell>{farmer.crops.length}</TableCell>
                    <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Active
                        </Badge>
                    </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
