
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import { Badge } from "../ui/badge";

const mockNotifications = [
    {
        id: 'notif-1',
        title: 'New Order Received',
        description: 'You have a new order (#ORD-004) for 3kg of Tomatoes.',
        time: '5m ago',
        read: false,
    },
    {
        id: 'notif-2',
        title: 'Payment Processed',
        description: 'Your payment of ₹600 for order #ORD-002 has been successfully processed.',
        time: '1h ago',
        read: false,
    },
    {
        id: 'notif-3',
        title: 'Shipment Update',
        description: 'Your order #ORD-001 has been shipped. Expected delivery tomorrow.',
        time: '1d ago',
        read: true,
    },
    {
        id: 'notif-4',
        title: 'Price Alert',
        description: 'AI suggests a new price of ₹32/kg for your Tomatoes based on market trends.',
        time: '2d ago',
        read: true,
    }
]


export function Notifications() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
                 <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
            )}
            <span className="sr-only">Toggle notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
            <div className="flex justify-end mb-2">
                <Button variant="ghost" size="sm" className="text-xs h-7">
                    <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
                    Mark all as read
                </Button>
            </div>
            <div className="space-y-4">
                {mockNotifications.map(notification => (
                    <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-background' : 'bg-primary/10'}`}>
                        <div className="flex justify-between items-start">
                             <h4 className="font-semibold text-sm">{notification.title}</h4>
                             {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        <p className="text-xs text-muted-foreground/70 mt-2">{notification.time}</p>
                    </div>
                ))}
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
