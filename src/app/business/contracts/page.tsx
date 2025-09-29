
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { InvoiceDialog } from "@/components/business/invoice-dialog";
import { Contract } from "@/lib/types";


const mockContracts: Contract[] = [
    { id: 'C-1024', farmer: 'Ram Singh', crop: 'Wheat', quantity: 5000, price: 21, status: 'Active', startDate: '2024-07-01', endDate: '2024-12-31' },
    { id: 'C-1023', farmer: 'Sita Devi', crop: 'Tomatoes', quantity: 2000, price: 28, status: 'Completed', startDate: '2024-05-01', endDate: '2024-07-31' },
    { id: 'C-1022', farmer: 'Anjali Patel', crop: 'Onions', quantity: 10000, price: 24, status: 'Active', startDate: '2024-06-15', endDate: '2024-11-15' },
    { id: 'C-1021', farmer: 'Ram Singh', crop: 'Potatoes', quantity: 3000, price: 14, status: 'Negotiation', startDate: '2024-08-01', endDate: '2024-10-31' },
];

const statusStyles: Record<string, string> = {
    Active: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Negotiation: 'bg-yellow-100 text-yellow-800',
    Terminated: 'bg-red-100 text-red-800',
};

export default function BusinessContractsPage() {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const handleViewInvoice = (contract: Contract) => {
    setSelectedContract(contract);
    setIsInvoiceOpen(true);
  }

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Contract Management</h1>
          <p className="text-muted-foreground">View, manage, and track all your farming contracts.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Contracts</CardTitle>
            <CardDescription>A list of all active, pending, and completed contracts with farmers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Price (₹/kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{contract.farmer}</TableCell>
                    <TableCell>{contract.crop}</TableCell>
                    <TableCell>{contract.quantity.toLocaleString()}</TableCell>
                    <TableCell>₹{contract.price}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusStyles[contract.status]}>
                          {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewInvoice(contract)}><FileText className="mr-2 h-4 w-4" />View Invoice</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedContract && (
        <InvoiceDialog 
          isOpen={isInvoiceOpen}
          onOpenChange={setIsInvoiceOpen}
          contract={selectedContract}
        />
      )}
    </>
  );
}
