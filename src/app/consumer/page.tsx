
'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCrops, mockFarmers } from "@/lib/mock-data";
import { Leaf, ShoppingCart, QrCode, BookUser, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { useToast } from "@/hooks/use-toast";
import { Crop } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type FilterType = "all" | "organic" | "veggies" | "fruits" | "grains";

const cropTypeMap: Record<string, FilterType> = {
    "Tomatoes": "veggies",
    "Potatoes": "veggies",
    "Carrots": "veggies",
    "Onions": "veggies",
    "Spinach": "veggies",
    "Wheat": "grains",
    "Apples": "fruits",
    "Grapes": "fruits",
    "Mangoes": "fruits",
};


export default function ConsumerDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [qrValue, setQrValue] = useState('');
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');

  const handleTabChange = (value: string) => {
    if (value === 'orders' || value === 'subscriptions') {
      router.push(`/consumer/${value}`);
    }
  };

  const handleGenerateQr = () => {
    // In a real app, you'd fetch a specific order or product URL
    const websiteUrl = window.location.origin;
    setQrValue(websiteUrl);
    setIsQrDialogOpen(true);
  };
  
  const handleAddToCart = (crop: Crop) => {
    addToCart(crop, 1);
    toast({
        title: "Added to Cart!",
        description: `1kg of ${crop.name} has been added to your cart.`,
    })
  }

  const filteredCrops = mockCrops.filter(crop => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'organic') return crop.farmingMethod === 'organic';
    return cropTypeMap[crop.name] === activeFilter;
  });

  const farmersWithCrops = mockFarmers.map(farmer => ({
    ...farmer,
    crops: filteredCrops.filter(crop => crop.farmerId === farmer.id).slice(0, 4)
  })).filter(farmer => farmer.crops.length > 0);


  const filterButtons: {label: string, value: FilterType}[] = [
      {label: "All", value: "all"},
      {label: "Organic", value: "organic"},
      {label: "Veggies", value: "veggies"},
      {label: "Fruits", value: "fruits"},
      {label: "Grains", value: "grains"},
  ]

  return (
    <div className="space-y-8">
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill objectFit="cover" data-ai-hint={heroImage.imageHint} />}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl font-bold">Buy Fresh, Directly from Farmers</h1>
          <p className="mt-2 max-w-2xl">Taste the difference of farm-to-table goodness. Every purchase supports a farmer.</p>
        </div>
      </div>
      
      <Tabs defaultValue="marketplace" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="mr-2 h-4 w-4"/>My Orders
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <BookUser className="mr-2 h-4 w-4"/>Subscriptions
          </TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="marketplace" className="mt-6">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Crop Marketplace</h2>
            <div className="flex gap-2">
                {filterButtons.map(filter => (
                    <Button 
                        key={filter.value}
                        variant={activeFilter === filter.value ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setActiveFilter(filter.value)}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>
          </div>
          <div className="space-y-8">
            {farmersWithCrops.length > 0 ? (
                farmersWithCrops.map(farmer => (
                <div key={farmer.id}>
                    <div className="flex items-center gap-3 mb-4">
                    <Image src={farmer.avatarUrl} alt={farmer.name} width={40} height={40} className="rounded-full" data-ai-hint="farmer profile" />
                    <div>
                        <h3 className="font-bold text-lg">{farmer.name}</h3>
                        <p className="text-sm text-muted-foreground">{farmer.location}</p>
                    </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {farmer.crops.map(crop => (
                        <Card key={crop.id} className="flex flex-col">
                        <CardHeader className="p-0">
                            <Image src={crop.imageUrl} alt={crop.name} width={400} height={300} className="rounded-t-lg object-cover aspect-[4/3]" data-ai-hint={crop.imageHint}/>
                        </CardHeader>
                        <CardContent className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{crop.name}</CardTitle>
                            {crop.farmingMethod === 'organic' && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><Leaf className="w-3 h-3 mr-1"/>Organic</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Harvest: {new Date(crop.harvestDate).toLocaleDateString()}</p>
                            <p className="text-lg font-bold mt-2">₹{crop.price}/kg</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full" onClick={() => handleAddToCart(crop)}><ShoppingCart className="w-4 h-4 mr-2" />Add to Cart</Button>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>
                </div>
                ))
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No crops found for the selected filter.</p>
                </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="profile" className="mt-6" id="profile">
          <Card>
             <CardHeader>
              <CardTitle>QR System & Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Scan QR for Crop Journey</h3>
                    <p className="text-sm text-muted-foreground">After delivery, scan the QR to see full details.</p>
                  </div>
                  <Button variant="outline" onClick={handleGenerateQr}><QrCode className="w-4 h-4 mr-2"/>Generate QR</Button>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Scan to visit KrishiSaarthi</DialogTitle>
                    <DialogDescription>
                      Use your phone's camera to scan the code below and visit the KrishiSaarthi website.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 bg-white rounded-lg flex items-center justify-center">
                    {qrValue && <QRCode value={qrValue} size={256} />}
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Weekly Veggie Box</h3>
                  <p className="text-sm text-muted-foreground">Subscribe and save on your weekly essentials.</p>
                </div>
                <Button asChild>
                  <Link href="/consumer/subscriptions">View Plans</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    