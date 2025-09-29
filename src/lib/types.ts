

export type UserRole = "farmer" | "consumer" | "business" | "coordinator" | "admin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Crop {
  id: string;
  farmerId: string;
  name: string;
  quantity: number; // in kg
  harvestDate: string; // ISO 8601 date string
  pesticidesUsed: boolean;
  organicCertificationUrl?: string;
  price: number; // per kg
  location: string;
  farmingMethod: 'organic' | 'conventional';
  expectedYield: number; // in kg per hectare
  imageUrl: string;
  imageHint: string;
}

export interface Farmer extends User {
  role: 'farmer';
  avatarUrl: string;
  location: string;
  crops: Crop[];
  walletBalance: number;
}

export interface OrderItem {
  cropId: string;
  quantity: number;
  cropName: string;
  cropImage: string;
}

export interface CartItem extends Crop {
    quantity: number;
}

export interface Order {
  id: string;
  consumerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Negotiation' | 'Harvesting' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  deliveryDate?: string;
}

export interface Contract {
    id: string;
    farmer: string;
    crop: string;
    quantity: number;
    price: number;
    status: 'Active' | 'Completed' | 'Negotiation' | 'Terminated';
    startDate: string;
    endDate: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Failed';
}

export interface Coordinator extends User {
    role: 'coordinator';
    avatarUrl: string;
    assignedFarmers: string[];
    activeVehicles: number;
    pendingOrders: number;
}

export interface Subscription {
  id: string;
  name: string;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  contents: string[];
  price: number;
  status: 'active' | 'paused';
  nextDelivery: string;
}
