"use client";

import { useState } from 'react';
import { Upload, X, Plus, Trash2 } from 'lucide-react';
import { vendors } from '@/data/mockData';
import { AddOnGroup, AddOnOption } from '@/types';

interface AddFoodItemFormProps {
  onSuccess: () => void;
}

export default function AddFoodItemForm({ onSuccess }: AddFoodItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    vendorId: '',
    category: '',
    description: '',
    price: 0,
    photo: null as File | null,
    availability: true
  });
  const [addOns, setAddOns] = useState<AddOnGroup[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const categories = [
    'Pizza', 'Burger', 'Sandwich', 'Salad', 'Pasta', 'Juice', 'Coffee', 
    'Grocery Item', 'Pastry', 'Dessert', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addAddOnGroup = () => {
    const newGroup: AddOnGroup = {
      id: Date.now().toString(),
      name: '',
      options: []
    };
    setAddOns(prev => [...prev, newGroup]);
  };

  const removeAddOnGroup = (groupId: string) => {
    setAddOns(prev => prev.filter(group => group.id !== groupId));
  };

  const updateAddOnGroup = (groupId: string, name: string) => {
    setAddOns(prev => prev.map(group => 
      group.id === groupId ? { ...group, name } : group
    ));
  };

  const addAddOnOption = (groupId: string) => {
    const newOption: AddOnOption = {
      id: Date.now().toString(),
      name: '',
      price: 0
    };
    setAddOns(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, options: [...group.options, newOption] }
        : group
    ));
  };

  const removeAddOnOption = (groupId: string, optionId: string) => {
    setAddOns(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, options: group.options.filter(option => option.id !== optionId) }
        : group
    ));
  };

  const updateAddOnOption = (groupId: string, optionId: string, field: 'name' | 'price', value: string | number) => {
    setAddOns(prev => prev.map(group => 
      group.id === groupId 
        ? {
            ...group, 
            options: group.options.map(option => 
              option.id === optionId 
                ? { ...option, [field]: value }
                : option
            )
          }
        : group
    ));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.vendorId) newErrors.vendorId = 'Vendor selection is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Here you would typically send the data to your API
    console.log('Food item data:', { ...formData, addOns });
    
    alert('Food item added successfully!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter item name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor *
            </label>
            <select
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none ${
                errors.vendorId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select vendor</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
              ))}
            </select>
            {errors.vendorId && <p className="text-red-500 text-sm mt-1">{errors.vendorId}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (MAD) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the food item..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Photo</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Photo
            </label>
          </div>
          {photoPreview && (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Food preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setPhotoPreview(null);
                  setFormData(prev => ({ ...prev, photo: null }));
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add-ons System */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add-ons</h3>
          <button
            type="button"
            onClick={addAddOnGroup}
            className="flex items-center px-3 py-1 text-sm bg-[#2ECC71] text-white rounded-lg hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Group
          </button>
        </div>

        <div className="space-y-6">
          {addOns.map((group, groupIndex) => (
            <div key={group.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={group.name}
                  onChange={(e) => updateAddOnGroup(group.id, e.target.value)}
                  placeholder="Group name (e.g., Sauces, Drinks)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeAddOnGroup(group.id)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {group.options.map((option, optionIndex) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) => updateAddOnOption(group.id, option.id, 'name', e.target.value)}
                      placeholder="Option name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                    />
                    <input
                      type="number"
                      value={option.price}
                      onChange={(e) => updateAddOnOption(group.id, option.id, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                    />
                    <span className="text-sm text-gray-500">MAD</span>
                    <button
                      type="button"
                      onClick={() => removeAddOnOption(group.id, option.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addAddOnOption(group.id)}
                  className="flex items-center px-3 py-1 text-sm text-[#FF6B35] border border-[#FF6B35] rounded-lg hover:bg-orange-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </button>
              </div>
            </div>
          ))}
        </div>

        {addOns.length === 0 && (
          <p className="text-gray-500 text-sm">No add-on groups added yet. Click "Add Group" to start.</p>
        )}
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.availability}
            onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.checked }))}
            className="mr-2 w-4 h-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Item is available for ordering
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => onSuccess()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-[#2ECC71] rounded-lg hover:bg-green-600"
        >
          Create Food Item
        </button>
      </div>
    </form>
  );
}