"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddDeliveryPersonForm from '@/components/forms/AddDeliveryPersonForm';
import { deliveryPersons } from '@/data/mockData';
import { DeliveryPerson } from '@/types';
import { formatDate } from '@/lib/utils';

export default function DeliveriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredPersons, setFilteredPersons] = useState(deliveryPersons);
  const [statusFilter, setStatusFilter] = useState('');

  const handleFilter = () => {
    let filtered = deliveryPersons;

    if (statusFilter) {
      filtered = filtered.filter(person => person.status === statusFilter);
    }

    setFilteredPersons(filtered);
  };

  const clearFilters = () => {
    setStatusFilter('');
    setFilteredPersons(deliveryPersons);
  };

  const handleEdit = (person: DeliveryPerson) => {
    alert(`Edit delivery person: ${person.name}`);
  };

  const handleDelete = (person: DeliveryPerson) => {
    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      alert(`Deleted delivery person: ${person.name}`);
    }
  };

  const handleCall = (person: DeliveryPerson) => {
    window.open(`tel:${person.phone}`, '_self');
  };

  const handleWhatsApp = (person: DeliveryPerson) => {
    const message = encodeURIComponent(`Hello ${person.name}, this is from Omeal admin panel.`);
    window.open(`https://wa.me/${person.phone.replace(/[^\d]/g, '')}?text=${message}`, '_blank');
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
      key: 'profilePicture',
      label: 'Photo',
      render: (value: string, row: DeliveryPerson) => (
        value ? (
          <img src={value} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {row.name.charAt(0)}
            </span>
          </div>
        )
      )
    },
    {
      key: 'name',
      label: 'Full Name',
      render: (value: string, row: DeliveryPerson) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">CIN: {row.cin}</div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone (WhatsApp)',
      render: (value: string, row: DeliveryPerson) => (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono">{value}</span>
          <button
            onClick={() => handleCall(row)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleWhatsApp(row)}
            className="p-1 text-green-600 hover:text-green-800"
            title="WhatsApp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
            </svg>
          </button>
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
      key: 'createdAt',
      label: 'Date Added',
      render: (value: string) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: DeliveryPerson) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
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
      <Header title="Delivery Staff Management" />
      
      <div className="p-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Delivery Personnel</h2>
            <p className="text-sm text-gray-600">Manage your delivery team</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Delivery Person
          </button>
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-3xl font-bold text-gray-900">{deliveryPersons.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {deliveryPersons.filter(p => p.status === 'Active').length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-3xl font-bold text-red-600">
                  {deliveryPersons.filter(p => p.status === 'Inactive').length}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Persons Table */}
        <Table
          data={filteredPersons}
          columns={columns}
          searchPlaceholder="Search delivery persons..."
          exportFilename="delivery-staff"
        />
      </div>

      {/* Add Delivery Person Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Delivery Person"
        size="md"
      >
        <AddDeliveryPersonForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}