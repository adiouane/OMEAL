"use client";

import { useState } from 'react';
import { Plus, Store, UtensilsCrossed, Truck, ShoppingBag, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import { dashboardStats, orders } from '@/data/mockData';
import { formatDateTime, formatPrice } from '@/lib/utils';

export default function DashboardPage() {
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isAddFoodItemOpen, setIsAddFoodItemOpen] = useState(false);
  const [isAddDeliveryOpen, setIsAddDeliveryOpen] = useState(false);

  // Recent orders (last 5)
  const recentOrders = orders.slice(0, 5);

  const orderColumns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (value: string) => (
        <span className="font-mono text-xs">{value}</span>
      )
    },
    {
      key: 'customerName',
      label: 'Customer'
    },
    {
      key: 'vendorName',
      label: 'Vendor'
    },
    {
      key: 'totalPrice',
      label: 'Total',
      render: (value: number) => (
        <span className="font-semibold">{formatPrice(value)}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const statusColors = {
          'Pending': 'bg-yellow-100 text-yellow-800',
          'In Progress': 'bg-blue-100 text-blue-800',
          'Delivered': 'bg-green-100 text-green-800',
          'Cancelled': 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[value as keyof typeof statusColors]}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'createdAt',
      label: 'Time',
      render: (value: string) => formatDateTime(value)
    }
  ];

  return (
    <div>
      <Header title="Dashboard" />
      
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Vendors"
            value={dashboardStats.totalVendors}
            icon={<Store className="w-6 h-6" />}
            color="orange"
            trend={{ value: 12, isUp: true }}
          />
          <StatsCard
            title="Food Items"
            value={dashboardStats.totalFoodItems}
            icon={<UtensilsCrossed className="w-6 h-6" />}
            color="green"
            trend={{ value: 8, isUp: true }}
          />
          <StatsCard
            title="Active Deliveries"
            value={dashboardStats.activeDeliveries}
            icon={<Truck className="w-6 h-6" />}
            color="blue"
            trend={{ value: 5, isUp: false }}
          />
          <StatsCard
            title="Orders Today"
            value={dashboardStats.ordersToday}
            icon={<ShoppingBag className="w-6 h-6" />}
            color="purple"
            trend={{ value: 15, isUp: true }}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setIsAddVendorOpen(true)}
              className="flex items-center justify-center px-6 py-4 bg-[#FF6B35] text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Vendor
            </button>
            <button
              onClick={() => setIsAddFoodItemOpen(true)}
              className="flex items-center justify-center px-6 py-4 bg-[#2ECC71] text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Food Item
            </button>
            <button
              onClick={() => setIsAddDeliveryOpen(true)}
              className="flex items-center justify-center px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Delivery Person
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              Live updates
            </div>
          </div>
          
          <Table
            data={recentOrders}
            columns={orderColumns}
            searchable={false}
            exportable={false}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isAddVendorOpen} onClose={() => setIsAddVendorOpen(false)} title="Add Vendor">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">This will redirect to the vendor management page.</p>
          <button
            onClick={() => {
              setIsAddVendorOpen(false);
              window.location.href = '/admin/vendors';
            }}
            className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-orange-600"
          >
            Go to Vendors
          </button>
        </div>
      </Modal>

      <Modal isOpen={isAddFoodItemOpen} onClose={() => setIsAddFoodItemOpen(false)} title="Add Food Item">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">This will redirect to the food items management page.</p>
          <button
            onClick={() => {
              setIsAddFoodItemOpen(false);
              window.location.href = '/admin/food-items';
            }}
            className="px-6 py-2 bg-[#2ECC71] text-white rounded-lg hover:bg-green-600"
          >
            Go to Food Items
          </button>
        </div>
      </Modal>

      <Modal isOpen={isAddDeliveryOpen} onClose={() => setIsAddDeliveryOpen(false)} title="Add Delivery Person">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">This will redirect to the delivery management page.</p>
          <button
            onClick={() => {
              setIsAddDeliveryOpen(false);
              window.location.href = '/admin/deliveries';
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go to Deliveries
          </button>
        </div>
      </Modal>
    </div>
  );
}