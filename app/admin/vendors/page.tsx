"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddVendorForm from '@/components/forms/AddVendorForm';
import { vendors } from '@/data/mockData';
import { Vendor } from '@/types';

export default function VendorsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const categories = ['Restaurant', 'Grocery', 'Bakery', 'Café', 'Other'];

  const handleFilter = () => {
    let filtered = vendors;

    if (categoryFilter) {
      filtered = filtered.filter(vendor => vendor.category === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(vendor => vendor.status === statusFilter);
    }

    setFilteredVendors(filtered);
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    setFilteredVendors(vendors);
  };

  const handleEdit = (vendor: Vendor) => {
    alert(`Edit vendor: ${vendor.name}`);
  };

  const handleDelete = (vendor: Vendor) => {
    if (confirm(`Are you sure you want to delete ${vendor.name}?`)) {
      alert(`Deleted vendor: ${vendor.name}`);
    }
  };

  const handleViewMenu = (vendor: Vendor) => {
    alert(`View menu for: ${vendor.name}`);
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
      key: 'logo',
      label: 'Logo',
      render: (value: string, row: Vendor) => (
        value ? (
          <img src={value} alt={row.name} className="w-10 h-10 rounded-lg object-cover" />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500">
              {row.name.charAt(0)}
            </span>
          </div>
        )
      )
    },
    {
      key: 'name',
      label: 'Vendor Name',
      render: (value: string, row: Vendor) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.ownerName}</div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {value}
        </span>
      )
    },
    {
      key: 'phone',
      label: 'Phone'
    },
    {
      key: 'address',
      label: 'Address',
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: Vendor) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewMenu(row)}
            className="p-1 text-green-600 hover:text-green-800"
            title="View Menu"
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
      <Header title="Vendors Management" />
      
      <div className="p-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Vendors</h2>
            <p className="text-sm text-gray-600">Manage your vendor partners</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vendor
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-orange-600 transition-colors"
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

        {/* Vendors Table */}
        <Table
          data={filteredVendors}
          columns={columns}
          searchPlaceholder="Search vendors..."
          exportFilename="vendors"
        />
      </div>

      {/* Add Vendor Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Vendor"
        size="lg"
      >
        <AddVendorForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}