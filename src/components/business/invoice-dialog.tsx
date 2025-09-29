
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AppLogo } from '@/components/logo';
import { Printer, Download } from 'lucide-react';
import type { Contract } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter as TableFoot,
} from "@/components/ui/table";


interface InvoiceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  contract: Contract;
}

export function InvoiceDialog({
  isOpen,
  onOpenChange,
  contract,
}: InvoiceDialogProps) {

  const subtotal = contract.quantity * contract.price;
  const taxRate = 0.05; // 5% GST
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handlePrint = () => {
    // In a real application, you would use a library like react-to-print
    // or generate a PDF on the server.
    window.print();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0">
        <div className="p-8" id="invoice-content">
            <DialogHeader className="mb-8">
              <div className="flex justify-between items-start">
                  <div className="space-y-1">
                      <h1 className="text-4xl font-bold text-primary">INVOICE</h1>
                      <p className="text-muted-foreground">Contract ID: {contract.id}</p>
                  </div>
                  <AppLogo className="h-10 w-auto text-primary" />
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="font-semibold mb-2">From:</h3>
                    <address className="not-italic text-muted-foreground">
                        KrishiSaarthi Inc.<br />
                        123 Agri-Tech Ave<br />
                        Pune, Maharashtra, 411001<br />
                        India
                    </address>
                </div>
                 <div className="text-right">
                    <h3 className="font-semibold mb-2">To:</h3>
                     <address className="not-italic text-muted-foreground">
                        {contract.farmer}<br />
                        (Details on file)<br/>
                        {contract.status}
                    </address>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-8">
                <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground font-semibold">Start Date</p>
                    <p className="font-bold text-base">{new Date(contract.startDate).toLocaleDateString()}</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground font-semibold">End Date</p>
                    <p className="font-bold text-base">{new Date(contract.endDate).toLocaleDateString()}</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground font-semibold">Invoice Date</p>
                    <p className="font-bold text-base">{new Date().toLocaleDateString()}</p>
                </div>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Quantity (kg)</TableHead>
                        <TableHead className="text-center">Rate (₹/kg)</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{contract.crop}</TableCell>
                        <TableCell className="text-center">{contract.quantity.toLocaleString()}</TableCell>
                        <TableCell className="text-center">₹{contract.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">₹{subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFoot>
                    <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                        <TableCell className="text-right">₹{subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">GST (5%)</TableCell>
                        <TableCell className="text-right">₹{tax.toFixed(2)}</TableCell>
                    </TableRow>
                     <TableRow className="text-lg font-bold">
                        <TableCell colSpan={3} className="text-right">Total Amount</TableCell>
                        <TableCell className="text-right">₹{total.toFixed(2)}</TableCell>
                    </TableRow>
                </TableFoot>
            </Table>

            <Separator className="my-8" />
            
            <div>
                <h4 className="font-semibold mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground">
                    This invoice is for the contract between KrishiSaarthi Inc. and {contract.farmer}. 
                    Payment is due upon successful completion and verification of the contract terms.
                </p>
            </div>
        </div>

        <DialogFooter className="bg-muted/50 p-4 border-t flex-row justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button onClick={() => alert('Downloading PDF...')}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

