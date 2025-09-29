
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Truck, Car } from "lucide-react";
import { cn } from "@/lib/utils";

const mockShipments = [
    { id: 'SHP-001', vehicle: 'MH12-3456', status: 'In Transit', destination: 'Pune Warehouse', progress: 60 },
    { id: 'SHP-002', vehicle: 'MH14-7890', status: 'Pending', destination: 'Mumbai Port', progress: 0 },
    { id: 'SHP-003', vehicle: 'KA05-1234', status: 'Delivered', destination: 'Bangalore Retail', progress: 100 },
];

const mockVehicles = [
    { id: 'MH12-3456', type: 'Truck', status: 'In Use' },
    { id: 'MH14-7890', type: 'Truck', status: 'Available' },
    { id: 'KA05-1234', type: 'Truck', status: 'Maintenance' },
    { id: 'MH12-5555', type: 'Van', status: 'Available' },
]

const statusStyles: Record<string, string> = {
    'In Transit': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Delivered': 'bg-green-100 text-green-800',
};


export default function CoordinatorLogisticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logistics Management</h1>
          <p className="text-muted-foreground">Schedule shipments and track vehicles.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Shipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>Track all ongoing and pending shipments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.vehicle}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(statusStyles[shipment.status])}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Vehicle Management</CardTitle>
            <CardDescription>Overview of all logistics vehicles.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockVehicles.map(vehicle => (
                    <div key={vehicle.id} className="p-4 border rounded-lg flex items-center gap-4">
                        <Truck className="h-8 w-8 text-primary"/>
                        <div>
                            <p className="font-bold">{vehicle.id}</p>
                            <p className="text-sm capitalize">{vehicle.type}</p>
                            <Badge variant={vehicle.status === 'Available' ? 'default': 'secondary' } className="mt-1">
                                {vehicle.status}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
