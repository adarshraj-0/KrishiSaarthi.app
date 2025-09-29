
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/lib/types';
import { useAuth } from '@/context/auth-context';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  role: z.enum(['farmer', 'consumer', 'business', 'coordinator', 'admin'], {
    required_error: 'You need to select a role.',
  }),
});

const roles: { name: UserRole; label: string }[] = [
  { name: 'farmer', label: 'Farmer' },
  { name: 'consumer', label: 'Consumer' },
  { name: 'business', label: 'Business' },
  { name: 'coordinator', label: 'Coordinator' },
  { name: 'admin', label: 'Admin' },
];

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // In a real app, you'd validate credentials against a backend.
    const userName = values.email.split('@')[0]; // simple name generation
    login(values.role, userName, values.email);
    
    toast({
      title: 'Logged In!',
      description: `Welcome back, ${userName}! Redirecting to your dashboard.`,
    });
    router.push(`/${values.role}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
       <div className="w-full max-w-md">
         <div className="mb-6 flex justify-center">
            <AppLogo className="h-10 w-auto text-primary" />
         </div>
        <Card>
            <CardHeader className="text-center">
            <CardTitle className="text-2xl">Log in to your account</CardTitle>
            <CardDescription>
                Select your role and enter your credentials.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input type="email" placeholder="ram@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Log in as...</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {roles.map(role => (
                                <SelectItem key={role.name} value={role.name}>
                                    {role.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Log In
                </Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="underline">
                    Sign up
                </Link>
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
