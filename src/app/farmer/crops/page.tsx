
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Crop } from '@/lib/types';
import { PlusCircle, Pencil } from 'lucide-react';
import { EditCropDialog } from '@/components/farmer/edit-crop-dialog';
import { useFarmer } from '@/context/farmer-context';

export default function MyCropsPage() {
  const { crops, updateCrop } = useFarmer();
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (crop: Crop) => {
    setSelectedCrop(crop);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateCrop = (updatedCrop: Crop) => {
    updateCrop(updatedCrop);
    setIsEditDialogOpen(false);
    setSelectedCrop(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Crops</h1>
        <Button asChild>
          <Link href="/farmer">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Crop
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Crop Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Price (₹/kg)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={crop.imageUrl}
                        alt={crop.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                        data-ai-hint={crop.imageHint}
                      />
                      <div>
                        <p className="font-medium">{crop.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Harvest: {new Date(crop.harvestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{crop.quantity}</TableCell>
                  <TableCell>₹{crop.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        crop.quantity > 0 ? 'secondary' : 'destructive'
                      }
                      className={crop.quantity > 0 ? 'bg-green-100 text-green-800' : ''}
                    >
                      {crop.quantity > 0 ? 'In Stock' : 'Sold Out'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(crop)}>
                      <Pencil className="mr-2 h-4 w-4"/>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedCrop && (
        <EditCropDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          crop={selectedCrop}
          onUpdate={handleUpdateCrop}
        />
      )}
    </div>
  );
}
