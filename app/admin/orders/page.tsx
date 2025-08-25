"use client";

import { useState } from 'react';
import { Eye, MapPin, Clock, User } from 'lucide-react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import { orders, deliveryPersons } from '@/data/mockData';
import { Order, OrderItem } from '@/types';
import { formatDateTime, formatPrice } from '@/lib/utils';

export default function OrdersPage() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [statusFilter, setStatusFilter] = useState('');

  const statuses = ['Pending', 'In Progress', 'Delivered', 'Cancelled'];

  const handleFilter = () => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const clearFilters = () => {
    setStatusFilter('');
    setFilteredOrders(orders);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Here you would update the order status via API
    alert(`Order ${orderId} status changed to: ${newStatus}`);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors];
  };

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (value: string) => (
        <span className="font-mono text-sm font-medium">{value}</span>
      )
    },
    {
      key: 'customerName',
      label: 'Customer',
      render: (value: string, row: Order) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.customerPhone}</div>
        </div>
      )
    },
    {
      key: 'vendorName',
      label: 'Vendor',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'deliveryPersonName',
      label: 'Delivery Person',
      render: (value: string | undefined) => (
        <span className="text-sm text-gray-600">
          {value || 'Not assigned'}
        </span>
      )
    },
    {
      key: 'items',
      label: 'Items',
      render: (value: OrderItem[]) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {value.length} item{value.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-500">
            {value[0]?.name}{value.length > 1 ? `, +${value.length - 1} more` : ''}
          </div>
        </div>
      )
    },
    {
      key: 'totalPrice',
      label: 'Total',
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{formatPrice(value)}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string, row: Order) => (
        <select
          value={value}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(value)}`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      )
    },
    {
      key: 'createdAt',
      label: 'Order Time',
      render: (value: string) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {new Date(value).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(value).toLocaleTimeString()}
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: Order) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="p-1 text-blue-600 hover:text-blue-800"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div>
      <Header title="Orders Management" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
            <p className="text-sm text-gray-600">Track and manage customer orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statuses.map((status) => {
            const count = orders.filter(order => order.status === status).length;
            const percentage = ((count / orders.length) * 100).toFixed(1);
            
            return (
              <div key={status} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                    <p className="text-xs text-gray-500">{percentage}% of total</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0].replace('bg-', 'bg-')}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Orders Table */}
        <Table
          data={filteredOrders}
          columns={columns}
          searchPlaceholder="Search orders..."
          exportFilename="orders"
        />
      </div>

      {/* Order Details Modal */}
      <Modal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-gray-600">Order ID:</span> <span className="font-mono">{selectedOrder.id}</span></div>
                    <div><span className="text-gray-600">Date:</span> {formatDateTime(selectedOrder.createdAt)}</div>
                    <div><span className="text-gray-600">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div><span className="text-gray-600">Total:</span> <span className="font-semibold">{formatPrice(selectedOrder.totalPrice)}</span></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedOrder.customerName}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {selectedOrder.customerPhone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h1a1 1 0 011 1v4" />
                  </svg>
                  Vendor
                </h4>
                <p className="text-sm text-gray-700">{selectedOrder.vendorName}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Delivery Person
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedOrder.deliveryPersonName || 'Not assigned yet'}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Ordered Items</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                    
                    {item.addOns.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 mb-1">Add-ons:</p>
                        <div className="space-y-1">
                          {item.addOns.map((addOn, addOnIndex) => (
                            <div key={addOnIndex} className="flex justify-between text-sm">
                              <span className="text-gray-600">• {addOn.option}</span>
                              <span className="text-gray-600">{formatPrice(addOn.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}