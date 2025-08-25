"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddFoodItemForm from '@/components/forms/AddFoodItemForm';
import { foodItems, vendors } from '@/data/mockData';
import { FoodItem } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function FoodItemsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [vendorFilter, setVendorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const categories = [...new Set(foodItems.map(item => item.category))];

  const handleFilter = () => {
    let filtered = foodItems;

    if (vendorFilter) {
      filtered = filtered.filter(item => item.vendorId === vendorFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (availabilityFilter) {
      filtered = filtered.filter(item => 
        availabilityFilter === 'available' ? item.availability : !item.availability
      );
    }

    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setVendorFilter('');
    setCategoryFilter('');
    setAvailabilityFilter('');
    setFilteredItems(foodItems);
  };

  const handleEdit = (item: FoodItem) => {
    alert(`Edit food item: ${item.name}`);
  };

  const handleDelete = (item: FoodItem) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      alert(`Deleted food item: ${item.name}`);
    }
  };

  const handleViewDetails = (item: FoodItem) => {
    alert(`View details for: ${item.name}`);
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (value: string) => (
        <span className="font-mono text-xs text-gray-500">{value}</span>
      )
    },
    {
      key: 'photo',
      label: 'Photo',
      render: (value: string, row: FoodItem) => (
        value ? (
          <img src={value} alt={row.name} className="w-12 h-12 rounded-lg object-cover" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500">
              {row.name.charAt(0)}
            </span>
          </div>
        )
      )
    },
    {
      key: 'name',
      label: 'Item Name',
      render: (value: string, row: FoodItem) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.description}</div>
        </div>
      )
    },
    {
      key: 'vendorName',
      label: 'Vendor',
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
          {value}
        </span>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{formatPrice(value)}</span>
      )
    },
    {
      key: 'addOns',
      label: 'Add-ons',
      render: (value: any[]) => (
        <span className="text-sm text-gray-600">
          {value.length > 0 ? `${value.length} group(s)` : 'None'}
        </span>
      )
    },
    {
      key: 'availability',
      label: 'Status',
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Available' : 'Unavailable'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: FoodItem) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewDetails(row)}
            className="p-1 text-green-600 hover:text-green-800"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Header title="Food Items Management" />
      
      <div className="p-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Food Items</h2>
            <p className="text-sm text-gray-600">Manage your food menu items</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-[#2ECC71] text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Food Item
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor
              </label>
              <select
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent outline-none"
              >
                <option value="">All Vendors</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent outline-none"
              >
                <option value="">All Items</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-[#2ECC71] text-white rounded-lg hover:bg-green-600 transition-colors"
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

        {/* Food Items Table */}
        <Table
          data={filteredItems}
          columns={columns}
          searchPlaceholder="Search food items..."
          exportFilename="food-items"
        />
      </div>

      {/* Add Food Item Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Food Item"
        size="xl"
      >
        <AddFoodItemForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}