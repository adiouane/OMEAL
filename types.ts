export interface Vendor {
  id: string;
  name: string;
  category: 'Restaurant' | 'Grocery' | 'Bakery' | 'Café' | 'Other';
  phone: string;
  address: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  logo?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

export interface AddOnGroup {
  id: string;
  name: string;
  options: AddOnOption[];
}

export interface FoodItem {
  id: string;
  name: string;
  vendorId: string;
  vendorName: string;
  category: string;
  description: string;
  price: number;
  photo?: string;
  availability: boolean;
  addOns: AddOnGroup[];
  createdAt: string;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  cin: string;
  profilePicture?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  vendorId: string;
  vendorName: string;
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  addOns: {
    groupName: string;
    option: string;
    price: number;
  }[];
}

export interface DashboardStats {
  totalVendors: number;
  totalFoodItems: number;
  activeDeliveries: number;
  ordersToday: number;
}