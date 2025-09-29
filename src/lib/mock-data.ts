
import type { Farmer, Crop, Transaction, Coordinator, Order, Subscription } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    return {
        url: img?.imageUrl || "https://picsum.photos/seed/default/400/300",
        hint: img?.imageHint || "default"
    };
};

export const mockFarmers: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Ram Singh',
    role: 'farmer',
    avatarUrl: getImage('farmer-profile-1').url,
    location: 'Nashik, Maharashtra',
    walletBalance: 12500,
    crops: [],
  },
  {
    id: 'farmer-2',
    name: 'Sita Devi',
    role: 'farmer',
    avatarUrl: getImage('farmer-profile-2').url,
    location: 'Mysuru, Karnataka',
    walletBalance: 8200,
    crops: [],
  },
  {
    id: 'farmer-3',
    name: 'Anjali Patel',
    role: 'farmer',
    avatarUrl: getImage('farmer-profile-3').url,
    location: 'Satara, Maharashtra',
    walletBalance: 9500,
    crops: [],
  }
];

export const mockCrops: Crop[] = [
  {
    id: 'crop-1',
    farmerId: 'farmer-1',
    name: 'Tomatoes',
    quantity: 250,
    harvestDate: '2024-08-15',
    pesticidesUsed: false,
    organicCertificationUrl: 'https://example.com/cert-1.pdf',
    price: 30,
    location: 'Nashik, Maharashtra',
    farmingMethod: 'organic',
    expectedYield: 1000,
    imageUrl: getImage('tomatoes').url,
    imageHint: getImage('tomatoes').hint,
  },
  {
    id: 'crop-2',
    farmerId: 'farmer-1',
    name: 'Potatoes',
    quantity: 500,
    harvestDate: '2024-08-10',
    pesticidesUsed: true,
    price: 15,
    location: 'Nashik, Maharashtra',
    farmingMethod: 'conventional',
    expectedYield: 2000,
    imageUrl: getImage('potatoes').url,
    imageHint: getImage('potatoes').hint,
  },
  {
    id: 'crop-3',
    farmerId: 'farmer-2',
    name: 'Carrots',
    quantity: 150,
    harvestDate: '2024-08-20',
    pesticidesUsed: false,
    price: 40,
    location: 'Mysuru, Karnataka',
    farmingMethod: 'organic',
    expectedYield: 800,
    imageUrl: getImage('carrots').url,
    imageHint: getImage('carrots').hint,
  },
  {
    id: 'crop-4',
    farmerId: 'farmer-2',
    name: 'Apples',
    quantity: 300,
    harvestDate: '2024-09-01',
    pesticidesUsed: false,
    price: 120,
    location: 'Mysuru, Karnataka',
    farmingMethod: 'organic',
    expectedYield: 1500,
    imageUrl: getImage('apples').url,
    imageHint: getImage('apples').hint,
  },
  {
    id: 'crop-5',
    farmerId: 'farmer-1',
    name: 'Wheat',
    quantity: 1000,
    harvestDate: '2024-07-30',
    pesticidesUsed: true,
    price: 22,
    location: 'Nashik, Maharashtra',
    farmingMethod: 'conventional',
    expectedYield: 3000,
    imageUrl: getImage('wheat').url,
    imageHint: getImage('wheat').hint,
  },
  {
    id: 'crop-6',
    farmerId: 'farmer-3',
    name: 'Onions',
    quantity: 600,
    harvestDate: '2024-08-25',
    pesticidesUsed: true,
    price: 25,
    location: 'Satara, Maharashtra',
    farmingMethod: 'conventional',
    expectedYield: 2500,
    imageUrl: getImage('onions').url,
    imageHint: getImage('onions').hint,
  },
  {
    id: 'crop-7',
    farmerId: 'farmer-3',
    name: 'Spinach',
    quantity: 100,
    harvestDate: '2024-08-18',
    pesticidesUsed: false,
    price: 35,
    location: 'Satara, Maharashtra',
    farmingMethod: 'organic',
    expectedYield: 500,
    imageUrl: getImage('spinach').url,
    imageHint: getImage('spinach').hint,
  },
  {
    id: 'crop-8',
    farmerId: 'farmer-1',
    name: 'Grapes',
    quantity: 400,
    harvestDate: '2024-09-05',
    pesticidesUsed: false,
    price: 80,
    location: 'Nashik, Maharashtra',
    farmingMethod: 'organic',
    expectedYield: 1200,
    imageUrl: getImage('grapes').url,
    imageHint: getImage('grapes').hint,
  },
  {
    id: 'crop-9',
    farmerId: 'farmer-2',
    name: 'Mangoes',
    quantity: 200,
    harvestDate: '2024-07-25',
    pesticidesUsed: false,
    price: 150,
    location: 'Mysuru, Karnataka',
    farmingMethod: 'organic',
    expectedYield: 1000,
    imageUrl: getImage('mangoes').url,
    imageHint: getImage('mangoes').hint,
  },
];

mockFarmers.forEach(farmer => {
    farmer.crops = mockCrops.filter(crop => crop.farmerId === farmer.id);
});

export const mockTransactions: Transaction[] = [
    {
        id: 'tx-1',
        date: '2024-07-25',
        description: 'Pre-booking from "Fresh Foods Inc."',
        amount: 5000,
        status: 'Confirmed'
    },
    {
        id: 'tx-2',
        date: '2024-07-24',
        description: 'Sale of Tomatoes (20kg)',
        amount: 600,
        status: 'Confirmed'
    },
    {
        id: 'tx-3',
        date: '2024-07-22',
        description: 'Withdrawal to Bank Account',
        amount: -10000,
        status: 'Confirmed'
    },
    {
        id: 'tx-4',
        date: '2024-07-21',
        description: 'Pre-booking from "Organic Store"',
        amount: 3000,
        status: 'Pending'
    },
];

export const mockCoordinator: Coordinator = {
    id: 'coord-1',
    name: 'Suresh Kumar',
    role: 'coordinator',
    avatarUrl: 'https://picsum.photos/seed/coordinator/100/100',
    assignedFarmers: ['farmer-1', 'farmer-2'],
    activeVehicles: 7,
    pendingOrders: 18,
};

export const mockOrders: Order[] = [
    {
        id: 'NEG-001',
        consumerId: 'business-1',
        items: [
            { cropId: 'crop-1', quantity: 100, cropName: 'Tomatoes', cropImage: getImage('tomatoes').url }
        ],
        totalAmount: 28 * 100, // Proposed price of 28
        status: 'Negotiation',
        orderDate: '2024-07-31',
    },
    {
        id: 'ORD-001',
        consumerId: 'consumer-1',
        items: [
            { cropId: 'crop-1', quantity: 5, cropName: 'Tomatoes', cropImage: getImage('tomatoes').url },
            { cropId: 'crop-2', quantity: 10, cropName: 'Potatoes', cropImage: getImage('potatoes').url }
        ],
        totalAmount: (5 * 30) + (10 * 15),
        status: 'Shipped',
        orderDate: '2024-07-28',
        deliveryDate: '2024-07-30'
    },
    {
        id: 'ORD-002',
        consumerId: 'consumer-2',
        items: [
            { cropId: 'crop-3', quantity: 2, cropName: 'Carrots', cropImage: getImage('carrots').url }
        ],
        totalAmount: 2 * 40,
        status: 'Delivered',
        orderDate: '2024-07-27',
        deliveryDate: '2024-07-29'
    },
    {
        id: 'ORD-003',
        consumerId: 'consumer-1',
        items: [
            { cropId: 'crop-5', quantity: 50, cropName: 'Wheat', cropImage: getImage('wheat').url }
        ],
        totalAmount: 50 * 22,
        status: 'Packed',
        orderDate: '2024-07-29',
    },
    {
        id: 'ORD-004',
        consumerId: 'consumer-3',
        items: [
            { cropId: 'crop-1', quantity: 3, cropName: 'Tomatoes', cropImage: getImage('tomatoes').url }
        ],
        totalAmount: 3 * 30,
        status: 'Harvesting',
        orderDate: '2024-07-30',
    },
        {
        id: 'ORD-005',
        consumerId: 'consumer-4',
        items: [
            { cropId: 'crop-4', quantity: 4, cropName: 'Apples', cropImage: getImage('apples').url }
        ],
        totalAmount: 4 * 120,
        status: 'Cancelled',
        orderDate: '2024-07-26',
    }
];


export const mockSubscriptions: Subscription[] = [
    {
        id: 'sub-1',
        name: 'Weekly Veggie Box',
        frequency: 'weekly',
        contents: ['Tomatoes', 'Potatoes', 'Carrots', 'Spinach'],
        price: 750,
        status: 'active',
        nextDelivery: '2024-08-05'
    },
    {
        id: 'sub-2',
        name: 'Monthly Fruit Basket',
        frequency: 'monthly',
        contents: ['Apples', 'Bananas', 'Oranges'],
        price: 1200,
        status: 'active',
        nextDelivery: '2024-08-15'
    },
    {
        id: 'sub-3',
        name: 'Bi-Weekly Organic Essentials',
        frequency: 'bi-weekly',
        contents: ['Organic Wheat Flour', 'Brown Rice', 'Lentils'],
        price: 900,
        status: 'paused',
        nextDelivery: '2024-08-12'
    }
]

    

    
