
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Crop } from '@/lib/types';
import { mockCrops } from '@/lib/mock-data';

interface FarmerContextType {
  crops: Crop[];
  addCrop: (crop: Crop) => void;
  updateCrop: (updatedCrop: Crop) => void;
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export const FarmerProvider = ({ children }: { children: ReactNode }) => {
  const [crops, setCrops] = useState<Crop[]>(mockCrops.filter(c => c.farmerId === 'farmer-1'));

  const addCrop = (crop: Crop) => {
    setCrops(prevCrops => [...prevCrops, crop]);
  };

  const updateCrop = (updatedCrop: Crop) => {
    setCrops(prevCrops =>
      prevCrops.map(crop => (crop.id === updatedCrop.id ? updatedCrop : crop))
    );
  };

  return (
    <FarmerContext.Provider
      value={{
        crops,
        addCrop,
        updateCrop,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (context === undefined) {
    throw new Error('useFarmer must be used within a FarmerProvider');
  }
  return context;
};
