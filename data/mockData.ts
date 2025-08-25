import { Vendor, FoodItem, DeliveryPerson, Order, DashboardStats } from '@/types';

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Pizza Corner',
    category: 'Restaurant',
    phone: '+212 6 12 34 56 78',
    address: '123 Hassan II Boulevard, Casablanca',
    ownerName: 'Ahmed Bennani',
    ownerEmail: 'ahmed@pizzacorner.ma',
    ownerPhone: '+212 6 12 34 56 78',
    logo: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'Active',
    createdAt: '2024-01-15'
  },
  {
    id: 'v2',
    name: 'Fresh Market',
    category: 'Grocery',
    phone: '+212 6 98 76 54 32',
    address: '456 Mohammed V Avenue, Rabat',
    ownerName: 'Fatima El Alami',
    ownerEmail: 'fatima@freshmarket.ma',
    ownerPhone: '+212 6 98 76 54 32',
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'Active',
    createdAt: '2024-01-10'
  },
  {
    id: 'v3',
    name: 'Sweet Treats Bakery',
    category: 'Bakery',
    phone: '+212 6 11 22 33 44',
    address: '789 Zerktouni Street, Marrakech',
    ownerName: 'Youssef Tazi',
    ownerEmail: 'youssef@sweettreats.ma',
    ownerPhone: '+212 6 11 22 33 44',
    logo: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'Inactive',
    createdAt: '2024-01-08'
  }
];

export const foodItems: FoodItem[] = [
  {
    id: 'f1',
    name: 'Margherita Pizza',
    vendorId: 'v1',
    vendorName: 'Pizza Corner',
    category: 'Pizza',
    description: 'Fresh tomato sauce, mozzarella, and basil',
    price: 85,
    photo: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    availability: true,
    addOns: [
      {
        id: 'ag1',
        name: 'Sauces',
        options: [
          { id: 'ao1', name: 'Harissa Sauce', price: 5 },
          { id: 'ao2', name: 'Garlic Mayo', price: 5 },
          { id: 'ao3', name: 'BBQ Sauce', price: 7 }
        ]
      },
      {
        id: 'ag2',
        name: 'Drinks',
        options: [
          { id: 'ao4', name: 'Coca Cola', price: 12 },
          { id: 'ao5', name: 'Orange Juice', price: 15 },
          { id: 'ao6', name: 'Water', price: 8 }
        ]
      }
    ],
    createdAt: '2024-01-15'
  },
  {
    id: 'f2',
    name: 'Organic Bananas',
    vendorId: 'v2',
    vendorName: 'Fresh Market',
    category: 'Fruits',
    description: 'Fresh organic bananas, 1kg',
    price: 25,
    photo: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    availability: true,
    addOns: [],
    createdAt: '2024-01-12'
  },
  {
    id: 'f3',
    name: 'Chocolate Croissant',
    vendorId: 'v3',
    vendorName: 'Sweet Treats Bakery',
    category: 'Pastry',
    description: 'Buttery croissant filled with rich chocolate',
    price: 18,
    photo: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    availability: false,
    addOns: [
      {
        id: 'ag3',
        name: 'Extra Toppings',
        options: [
          { id: 'ao7', name: 'Extra Chocolate', price: 8 },
          { id: 'ao8', name: 'Almonds', price: 12 }
        ]
      }
    ],
    createdAt: '2024-01-08'
  }
];

export const deliveryPersons: DeliveryPerson[] = [
  {
    id: 'd1',
    name: 'Mohammed Alami',
    phone: '+212 6 55 44 33 22',
    cin: 'AB123456',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'Active',
    createdAt: '2024-01-10'
  },
  {
    id: 'd2',
    name: 'Karim Benjelloun',
    phone: '+212 6 77 88 99 00',
    cin: 'CD789012',
    profilePicture: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'Active',
    createdAt: '2024-01-05'
  },
  {
    id: 'd3',
    name: 'Rachid Tounsi',
    phone: '+212 6 33 22 11 00',
    cin: 'EF345678',
    status: 'Inactive',
    createdAt: '2023-12-28'
  }
];

export const orders: Order[] = [
  {
    id: 'o1',
    customerName: 'Sara Benali',
    customerPhone: '+212 6 99 88 77 66',
    vendorId: 'v1',
    vendorName: 'Pizza Corner',
    deliveryPersonId: 'd1',
    deliveryPersonName: 'Mohammed Alami',
    items: [
      {
        id: 'oi1',
        name: 'Margherita Pizza',
        price: 85,
        quantity: 1,
        addOns: [
          { groupName: 'Sauces', option: 'Harissa Sauce', price: 5 },
          { groupName: 'Drinks', option: 'Coca Cola', price: 12 }
        ]
      }
    ],
    totalPrice: 102,
    status: 'In Progress',
    createdAt: '2024-01-20T14:30:00'
  },
  {
    id: 'o2',
    customerName: 'Hassan Amrani',
    customerPhone: '+212 6 44 55 66 77',
    vendorId: 'v2',
    vendorName: 'Fresh Market',
    deliveryPersonId: 'd2',
    deliveryPersonName: 'Karim Benjelloun',
    items: [
      {
        id: 'oi2',
        name: 'Organic Bananas',
        price: 25,
        quantity: 2,
        addOns: []
      }
    ],
    totalPrice: 50,
    status: 'Delivered',
    createdAt: '2024-01-20T12:15:00'
  },
  {
    id: 'o3',
    customerName: 'Aicha Mansouri',
    customerPhone: '+212 6 88 99 00 11',
    vendorId: 'v1',
    vendorName: 'Pizza Corner',
    items: [
      {
        id: 'oi3',
        name: 'Margherita Pizza',
        price: 85,
        quantity: 1,
        addOns: []
      }
    ],
    totalPrice: 85,
    status: 'Pending',
    createdAt: '2024-01-20T16:45:00'
  }
];

export const dashboardStats: DashboardStats = {
  totalVendors: vendors.length,
  totalFoodItems: foodItems.length,
  activeDeliveries: deliveryPersons.filter(d => d.status === 'Active').length,
  ordersToday: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length
};