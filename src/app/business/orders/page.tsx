
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCrops } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Leaf, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Crop } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function BusinessOrdersPage() {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const { toast } = useToast();

    const handleQuantityChange = (cropId: string, amount: number) => {
        setQuantities(prev => {
            const currentQuantity = prev[cropId] || 100; // Default to 100kg min for bulk
            const newQuantity = Math.max(100, currentQuantity + amount);
            return { ...prev, [cropId]: newQuantity };
        });
    }

    const handleNegotiate = (crop: Crop) => {
        const quantity = quantities[crop.id] || 100;
        toast({
            title: "Negotiation Initiated",
            description: `A negotiation request for ${quantity}kg of ${crop.name} has been sent.`,
        });
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Bulk Crop Marketplace</h1>
        <p className="text-muted-foreground">Find and procure fresh produce in bulk directly from farmers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Search for crops (e.g., Tomatoes)" />
                <Input placeholder="Search by region (e.g., Nashik)" />
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCrops.map(crop => (
          <Card key={crop.id}>
            <CardHeader className="p-0">
                <Image src={crop.imageUrl} alt={crop.name} width={400} height={300} className="rounded-t-lg object-cover aspect-video" data-ai-hint={crop.imageHint} />
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{crop.name}</CardTitle>
                    {crop.farmingMethod === 'organic' && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><Leaf className="w-3 h-3 mr-1"/>Organic</Badge>}
                </div>
              <p className="text-sm text-muted-foreground">Available: {crop.quantity} kg</p>
              <p className="text-lg font-bold mt-2">₹{crop.price}/kg</p>
               <p className="text-xs text-muted-foreground">From: {crop.location}</p>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">Quantity (kg):</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(crop.id, -50)}>
                            <Minus className="h-4 w-4"/>
                        </Button>
                        <Input 
                            type="number"
                            className="h-8 w-20 text-center"
                            value={quantities[crop.id] || 100}
                            onChange={(e) => setQuantities({...quantities, [crop.id]: parseInt(e.target.value)})}
                            min={100}
                            step={50}
                        />
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(crop.id, 50)}>
                            <Plus className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <Button className="w-full" onClick={() => handleNegotiate(crop)}>Request to Negotiate</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
