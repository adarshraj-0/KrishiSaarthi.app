
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockCrops, mockFarmers } from '@/lib/mock-data';

const negotiationSchema = z.object({
  farmerId: z.string({ required_error: 'Please select a farmer.' }),
  cropId: z.string({ required_error: 'Please select a crop.' }),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
  price: z.coerce.number().min(0, 'Proposed price cannot be negative.'),
  message: z.string().optional(),
});

interface NegotiationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function NegotiationDialog({
  isOpen,
  onOpenChange,
}: NegotiationDialogProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof negotiationSchema>>({
    resolver: zodResolver(negotiationSchema),
    defaultValues: {
      farmerId: '',
      cropId: '',
      quantity: 0,
      price: 0,
      message: '',
    }
  });

  const handleSubmit = (values: z.infer<typeof negotiationSchema>) => {
    console.log('Negotiation submitted:', values);
    toast({
      title: 'Negotiation Sent',
      description: 'Your negotiation request has been sent to the farmer.',
    });
    onOpenChange(false);
    form.reset();
  };

  const selectedFarmerId = form.watch('farmerId');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Start a Negotiation</DialogTitle>
          <DialogDescription>
            Select a farmer and crop, then propose your terms.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="farmerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farmer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a farmer to negotiate with" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockFarmers.map(farmer => (
                        <SelectItem key={farmer.id} value={farmer.id}>
                          {farmer.name} - {farmer.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cropId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedFarmerId}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedFarmerId ? "Select a crop" : "Select a farmer first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockCrops.filter(c => c.farmerId === selectedFarmerId).map(crop => (
                        <SelectItem key={crop.id} value={crop.id}>
                          {crop.name} (Available: {crop.quantity}kg)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposed Price (₹/kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add a personal message or specific requirements..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Send Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
