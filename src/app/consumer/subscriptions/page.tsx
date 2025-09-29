
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockSubscriptions } from "@/lib/mock-data";
import type { Subscription } from "@/lib/types";
import { Play, Pause, PackagePlus } from "lucide-react";
import { cn } from '@/lib/utils';

export default function ConsumerSubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);

    const toggleSubscriptionStatus = (id: string) => {
        setSubscriptions(prev => prev.map(sub => {
            if (sub.id === id) {
                return { ...sub, status: sub.status === 'active' ? 'paused' : 'active' };
            }
            return sub;
        }));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                 <div>
                    <h1 className="text-3xl font-bold">My Subscriptions</h1>
                    <p className="text-muted-foreground">Manage your recurring deliveries.</p>
                </div>
                <Button asChild>
                    <Link href="/consumer#profile">
                        <PackagePlus className="mr-2 h-4 w-4" />
                        Browse New Subscriptions
                    </Link>
                </Button>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map(sub => (
                    <Card key={sub.id} className={cn("flex flex-col", sub.status === 'paused' && 'bg-muted/50')}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{sub.name}</CardTitle>
                                <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                                    {sub.status === 'active' ? 'Active' : 'Paused'}
                                </Badge>
                            </div>
                            <CardDescription>
                                {sub.frequency.charAt(0).toUpperCase() + sub.frequency.slice(1)} delivery
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-2">What's inside:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {sub.contents.map(item => (
                                        <Badge key={item} variant="outline">{item}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="text-sm">
                                <p><span className="font-semibold">Price:</span> ₹{sub.price} / delivery</p>
                                <p><span className="font-semibold">Next Delivery:</span> {new Date(sub.nextDelivery).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                             <div className="flex items-center space-x-2">
                                <Switch
                                    id={`status-${sub.id}`}
                                    checked={sub.status === 'active'}
                                    onCheckedChange={() => toggleSubscriptionStatus(sub.id)}
                                />
                                <label htmlFor={`status-${sub.id}`} className="text-sm font-medium">
                                    {sub.status === 'active' ? 'Pause' : 'Resume'}
                                </label>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
