
'use client';

import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { Separator } from '../ui/separator';

export function CartDrawer() {
  const { cartItems, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-8 w-8">
          <ShoppingCart className="h-4 w-4" />
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{cartCount}</Badge>
          )}
          <span className="sr-only">Toggle cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>My Cart ({cartCount})</SheetTitle>
          <SheetDescription>
            Items in your cart are listed below.
          </SheetDescription>
        </SheetHeader>
        <Separator className="mt-4" />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 py-6">
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                        />
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} / kg</p>
                            <Button variant="ghost" size="icon" className="h-auto w-auto text-muted-foreground p-0 mt-1" onClick={() => removeFromCart(item.id)}>
                                <X className="h-3 w-3 mr-1"/>
                                Remove
                            </Button>
                        </div>
                        </div>
                        <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="h-8 w-16 text-center"
                            min="1"
                        />
                        </div>
                    </div>
                    ))}
                </div>
            </ScrollArea>
            <SheetFooter className="px-6 py-4 bg-background border-t">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
