
'use client';

import { useEffect } from 'react';
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
import { Crop } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const editCropSchema = z.object({
  quantity: z.coerce.number().min(0, 'Quantity cannot be negative.'),
  price: z.coerce.number().min(0, 'Price cannot be negative.'),
});

interface EditCropDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  crop: Crop | null;
  onUpdate: (updatedCrop: Crop) => void;
}

export function EditCropDialog({
  isOpen,
  onOpenChange,
  crop,
  onUpdate,
}: EditCropDialogProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof editCropSchema>>({
    resolver: zodResolver(editCropSchema),
  });

  useEffect(() => {
    if (crop) {
      form.reset({
        quantity: crop.quantity,
        price: crop.price,
      });
    }
  }, [crop, form]);

  if (!crop) {
    return null;
  }

  const handleSubmit = (values: z.infer<typeof editCropSchema>) => {
    const updatedCrop = { ...crop, ...values };
    onUpdate(updatedCrop);
    toast({
      title: 'Crop Updated',
      description: `${crop.name} has been successfully updated.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {crop.name}</DialogTitle>
          <DialogDescription>
            Update the quantity and price for your crop. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                  <FormLabel>Price (₹/kg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
