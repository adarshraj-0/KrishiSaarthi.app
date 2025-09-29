
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, FileDown, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">System Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5"/> Notification Settings</CardTitle>
                            <CardDescription>Manage automated system notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <Label htmlFor="new-user-notif" className="flex flex-col space-y-1">
                                    <span className="font-medium">New User Registration</span>
                                    <span className="text-sm text-muted-foreground">
                                        Send a welcome email to newly registered users.
                                    </span>
                                </Label>
                                <Switch id="new-user-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <Label htmlFor="order-confirm-notif" className="flex flex-col space-y-1">
                                    <span className="font-medium">Order Confirmations</span>
                                    <span className="text-sm text-muted-foreground">
                                        Send confirmation emails for new orders.
                                    </span>
                                </Label>
                                <Switch id="order-confirm-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <Label htmlFor="price-alert-notif" className="flex flex-col space-y-1">
                                    <span className="font-medium">AI Price Alerts</span>
                                    <span className="text-sm text-muted-foreground">
                                        Notify farmers about AI-suggested price changes.
                                    </span>
                                </Label>
                                <Switch id="price-alert-notif" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><FileDown className="mr-2 h-5 w-5"/> Data Management</CardTitle>
                            <CardDescription>Manage data exports and system backups.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <Button variant="outline">Export User Data</Button>
                            <Button variant="outline">Export Sales Data</Button>
                            <Button>Trigger System Backup</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5"/> Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center justify-between">
                                <Label htmlFor="mfa" className="font-medium">
                                    Require Two-Factor Auth for Admins
                                </Label>
                                <Switch id="mfa" />
                            </div>
                             <div className="flex flex-col space-y-2">
                                <Label htmlFor="session" className="font-medium">
                                    Session Timeout (minutes)
                                </Label>
                               <p className="text-sm text-muted-foreground">Set how long an admin can be inactive before being logged out.</p>
                               <input type="number" defaultValue="60" className="w-full p-2 border rounded-md" />
                            </div>
                            <Button variant="destructive" className="w-full">Revoke All Active Sessions</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

