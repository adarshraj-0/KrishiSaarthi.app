
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserPlus, ListFilter } from "lucide-react";
import { User, UserRole } from '@/lib/types';
import { mockFarmers, mockCrops } from '@/lib/mock-data';

// Mocking more diverse users for this page
const mockUsers: (User & { email: string; joined: string; status: 'Active' | 'Suspended' })[] = [
    ...mockFarmers.map(f => ({ ...f, id: f.id, name: f.name, role: 'farmer' as UserRole, avatarUrl: f.avatarUrl, email: `${f.name.split(' ')[0].toLowerCase()}@farm.co`, joined: '2024-07-15', status: 'Active' as const })),
    { id: 'user-cons-1', name: 'Priya Mehta', role: 'consumer', avatarUrl: 'https://picsum.photos/seed/cons-1/100/100', email: 'priya@mail.com', joined: '2024-07-20', status: 'Active' },
    { id: 'user-biz-1', name: 'Fresh Foods Inc.', role: 'business', avatarUrl: 'https://picsum.photos/seed/biz-1/100/100', email: 'contact@freshfoods.com', joined: '2024-06-10', status: 'Active' },
    { id: 'user-coord-1', name: 'Suresh Kumar', role: 'coordinator', avatarUrl: 'https://picsum.photos/seed/coord-1/100/100', email: 'suresh.k@network.co', joined: '2024-05-01', status: 'Active' },
    { id: 'user-cons-2', name: 'Amit Kumar', role: 'consumer', avatarUrl: 'https://picsum.photos/seed/cons-2/100/100', email: 'amit.k@mail.com', joined: '2024-07-22', status: 'Suspended' },
];

const roleColors: Record<UserRole, string> = {
    admin: "bg-red-500 text-white",
    farmer: "bg-green-100 text-green-800",
    consumer: "bg-blue-100 text-blue-800",
    business: "bg-purple-100 text-purple-800",
    coordinator: "bg-yellow-100 text-yellow-800"
}


export default function AdminUsersPage() {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilters, setRoleFilters] = useState<Set<UserRole>>(new Set());

    const toggleRoleFilter = (role: UserRole) => {
        setRoleFilters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(role)) {
                newSet.delete(role);
            } else {
                newSet.add(role);
            }
            return newSet;
        });
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilters.size === 0 || roleFilters.has(user.role);
        return matchesSearch && matchesRole;
    });

    const allRoles: UserRole[] = ['admin', 'farmer', 'consumer', 'business', 'coordinator'];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">View, manage, and monitor all users on the platform.</p>
                </div>
                <Button><UserPlus className="mr-2 h-4 w-4"/>Add New User</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>{filteredUsers.length} users found.</CardDescription>
                        </div>
                         <div className="flex items-center gap-2">
                            <Input 
                                placeholder="Search by name or email..." 
                                className="w-64"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9">
                                        <ListFilter className="mr-2 h-4 w-4" />
                                        Filter by Role
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {allRoles.map(role => (
                                        <DropdownMenuCheckboxItem
                                            key={role}
                                            checked={roleFilters.has(role)}
                                            onCheckedChange={() => toggleRoleFilter(role)}
                                            className="capitalize"
                                        >
                                            {role}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={`${roleColors[user.role]} capitalize`}>{user.role}</Badge>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4"/>
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
