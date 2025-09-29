
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListFilter, Truck, Check, X } from 'lucide-react';
import { mockOrders } from '@/lib/mock-data';
import type { Order } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const statusStyles: Record<Order['status'], string> = {
  Negotiation: 'bg-purple-100 text-purple-800',
  Harvesting: 'bg-blue-100 text-blue-800',
  Packed: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-green-100 text-green-800',
  Delivered: 'bg-gray-100 text-gray-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<Set<string>>(
    new Set()
  );
  const { toast } = useToast();

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast({
        title: "Order Updated",
        description: `Order ${orderId} has been marked as ${status}.`
    });
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return newSet;
    });
  };
  
  const filteredOrders = orders.filter(order => statusFilter.size === 0 || statusFilter.has(order.status));

  const orderStatuses = [...new Set(mockOrders.map(o => o.status))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Orders</h1>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter by Status
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {orderStatuses.map(status => (
                 <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.has(status)}
                    onCheckedChange={() => toggleStatusFilter(status)}
                 >
                    {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders & Negotiations</CardTitle>
          <CardDescription>
            A list of recent orders and negotiation requests from customers and businesses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex -space-x-4">
                      {order.items.map((item) => (
                        <Image
                          key={item.cropId}
                          src={item.cropImage}
                          alt={item.cropName}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-white"
                          title={`${item.cropName} (x${item.quantity})`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(statusStyles[order.status])}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.status === 'Negotiation' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600/50 hover:bg-green-50 hover:text-green-700" onClick={() => handleUpdateOrderStatus(order.id, 'Harvesting')}>
                          <Check className="mr-2 h-4 w-4" /> Accept
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600/50 hover:bg-red-50 hover:text-red-700" onClick={() => handleUpdateOrderStatus(order.id, 'Cancelled')}>
                          <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    )}
                    {order.status === 'Packed' && (
                      <Button size="sm" onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}>
                        <Truck className="mr-2 h-4 w-4" />
                        Mark as Shipped
                      </Button>
                    )}
                     {order.status === 'Harvesting' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateOrderStatus(order.id, 'Packed')}>
                        Mark as Packed
                      </Button>
                    )}
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
