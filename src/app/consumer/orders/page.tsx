
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockOrders, mockCrops, mockFarmers } from "@/lib/mock-data";
import type { Order, Crop, Farmer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle, Package, Truck, Home, XCircle, RefreshCcw, QrCode, Leaf, Tractor, MapPin, Wallet, CalendarDays, Box, CircleDollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from "react-qr-code";

const statusConfig: Record<Order['status'], { icon: React.ElementType; color: string; step: number }> = {
  Delivered: { icon: CheckCircle, color: 'text-green-600', step: 4 },
  Shipped: { icon: Truck, color: 'text-blue-600', step: 3 },
  Packed: { icon: Package, color: 'text-yellow-600', step: 2 },
  Harvesting: { icon: Package, color: 'text-orange-600', step: 1 },
  Cancelled: { icon: XCircle, color: 'text-red-600', step: 0 },
  Negotiation: { icon: CheckCircle, color: 'text-purple-600', step: 0 },
};

const timelineSteps = [
  { name: 'Harvesting', icon: Package },
  { name: 'Packed', icon: Package },
  { name: 'Shipped', icon: Truck },
  { name: 'Delivered', icon: Home },
];

export default function ConsumerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders.filter(o => !['Negotiation'].includes(o.status)));
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);

  const selectedOrderCropDetails = selectedOrder?.items[0] 
    ? mockCrops.find(c => c.id === selectedOrder.items[0].cropId)
    : null;
    
  const selectedOrderFarmerDetails = selectedOrderCropDetails
    ? mockFarmers.find(f => f.id === selectedOrderCropDetails.farmerId)
    : null;

  const qrCodeValue = selectedOrder ? JSON.stringify({
    orderId: selectedOrder.id,
    items: selectedOrder.items,
    total: selectedOrder.totalAmount,
    date: selectedOrder.orderDate
  }) : "";

  return (
    <>
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 h-full">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">Track your past and current orders.</p>
          </div>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.map(order => (
                <Button
                  key={order.id}
                  variant={selectedOrder?.id === order.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto py-3"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="text-left">
                      <p className="font-bold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={selectedOrder?.id === order.id ? "default" : "outline"}>
                        {order.status}
                    </Badge>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col gap-4">
          {selectedOrder ? (
            <Card className="flex-1">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{selectedOrder.id}</CardTitle>
                      <CardDescription>Order placed on {new Date(selectedOrder.orderDate).toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsQrDialogOpen(true)}><QrCode className="w-4 h-4 mr-2"/>View QR & Traceability</Button>
                      {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                          <Button>
                              <RefreshCcw className="mr-2 h-4 w-4"/>
                              Reorder
                          </Button>
                      )}
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold mb-4 text-lg">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map(item => (
                      <div key={item.cropId} className="flex items-center gap-4">
                        <Image src={item.cropImage} alt={item.cropName} width={64} height={64} className="rounded-md object-cover" />
                        <div className="flex-1">
                          <p className="font-medium">{item.cropName}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}kg</p>
                        </div>
                        <p className="font-medium">₹{(selectedOrder.totalAmount / selectedOrder.items.reduce((acc, i) => acc + i.quantity, 0) * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>
                  <div className="space-y-2">
                      <div className="flex justify-between">
                          <p className="text-muted-foreground">Subtotal</p>
                          <p>₹{selectedOrder.totalAmount.toFixed(2)}</p>
                      </div>
                       <div className="flex justify-between">
                          <p className="text-muted-foreground">Delivery</p>
                          <p>FREE</p>
                      </div>
                       <div className="flex justify-between font-bold text-lg">
                          <p>Total</p>
                          <p>₹{selectedOrder.totalAmount.toFixed(2)}</p>
                      </div>
                  </div>
                </div>
                
                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold mb-6 text-lg">Order Tracking</h3>
                  {selectedOrder.status !== 'Cancelled' ? (
                    <div className="flex justify-between">
                        {timelineSteps.map((step, index) => {
                            const currentStepInfo = statusConfig[selectedOrder.status];
                            const currentStepIndex = currentStepInfo ? currentStepInfo.step - 1 : -1;
                            const isCompleted = index < currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            return (
                                <div key={step.name} className="flex-1 text-center relative">
                                    <div className="flex justify-center items-center mb-2">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            isCompleted ? 'bg-primary text-primary-foreground' : isCurrent ? 'bg-primary/20 border-2 border-primary text-primary' : 'bg-muted text-muted-foreground'
                                        )}>
                                            <step.icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <p className={cn(
                                        "text-sm font-medium",
                                        (isCompleted || isCurrent) ? 'text-foreground' : 'text-muted-foreground'
                                    )}>{step.name}</p>
                                    {index < timelineSteps.length -1 && (
                                        <div className={cn(
                                            "absolute top-5 left-1/2 w-full h-0.5",
                                            isCompleted ? 'bg-primary' : 'bg-muted'
                                        )} style={{transform: "translateX(50%)"}}></div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                  ) : (
                    <div className='flex items-center justify-center flex-col gap-2 text-red-600'>
                      <XCircle className='h-10 w-10' />
                      <p className='font-semibold'>Order Cancelled</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select an order to see its details</p>
            </Card>
          )}
        </div>
      </div>
      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Crop Journey & Details</DialogTitle>
            <DialogDescription>
              Scan the QR code or view the complete traceability details of your farm-to-table journey.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            <div className="p-4 bg-white rounded-lg flex items-center justify-center self-start">
              {qrCodeValue && <QRCode value={qrCodeValue} size={256} />}
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-lg">Order ID: {selectedOrder?.id}</h3>
              {selectedOrderCropDetails && selectedOrderFarmerDetails && (
                <div className="space-y-4 text-sm">
                   <div className="flex items-center gap-3">
                      <Tractor className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Farmer:</span> {selectedOrderFarmerDetails.name}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Origin:</span> {selectedOrderCropDetails.location}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Harvest Date:</span> {new Date(selectedOrderCropDetails.harvestDate).toLocaleDateString()}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <Leaf className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Farming:</span> {selectedOrderCropDetails.farmingMethod === 'organic' ? 'Organic (No pesticides)' : `Conventional (Pesticides ${selectedOrderCropDetails.pesticidesUsed ? 'used' : 'not used'})`}</p>
                   </div>
                   <Separator className="my-4"/>
                   <h4 className="font-semibold text-base mb-2">Price Breakdown</h4>
                   <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div>
                        <p><span className="font-semibold">Sold by Farmer for:</span> ₹{selectedOrderCropDetails.price}/kg</p>
                        <p className="text-xs text-muted-foreground">Estimated Farmer's Profit: ₹{(selectedOrderCropDetails.price * 0.2).toFixed(2)}/kg (20%)</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Box className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Packaging Cost:</span> ₹2.50/kg</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Delivery Cost:</span> ₹5.00/kg</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <CircleDollarSign className="h-5 w-5 text-primary" />
                      <p><span className="font-semibold">Your Final Price:</span> ₹{(selectedOrderCropDetails.price + 2.50 + 5.00).toFixed(2)}/kg</p>
                   </div>
                </div>
              )}
               <Separator />
               <div>
                 <h4 className="font-semibold mb-2">Items in this order:</h4>
                 <ul className="list-disc list-inside text-muted-foreground">
                    {selectedOrder?.items.map(item => (
                        <li key={item.cropId}>{item.cropName} ({item.quantity} kg)</li>
                    ))}
                 </ul>
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
