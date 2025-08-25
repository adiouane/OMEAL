"use client";

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface AddDeliveryPersonFormProps {
  onSuccess: () => void;
}

export default function AddDeliveryPersonForm({ onSuccess }: AddDeliveryPersonFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cin: '',
    profilePicture: null as File | null,
    status: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [picturePreview, setPicturePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onload = () => setPicturePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.cin.trim()) newErrors.cin = 'CIN is required';

    // Phone validation (basic Morocco format)
    const phoneRegex = /^\+212\s?[67]\d{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Moroccan phone number (+212 6XXXXXXXX)';
    }

    // CIN validation (basic format)
    if (formData.cin && formData.cin.length < 6) {
      newErrors.cin = 'CIN must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Here you would typically send the data to your API
    console.log('Delivery person data:', formData);
    
    alert('Delivery person added successfully!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (WhatsApp) *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+212 6 XX XX XX XX"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          <p className="text-sm text-gray-500 mt-1">
            This will be used for WhatsApp communication
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CIN (National ID) *
          </label>
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.cin ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter CIN number"
          />
          {errors.cin && <p className="text-red-500 text-sm mt-1">{errors.cin}</p>}
        </div>
      </div>

      {/* Profile Picture */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="picture-upload"
            />
            <label
              htmlFor="picture-upload"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Photo
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Optional: Upload a profile picture
            </p>
          </div>
          {picturePreview && (
            <div className="relative">
              <img
                src={picturePreview}
                alt="Profile preview"
                className="w-20 h-20 object-cover rounded-full"
              />
              <button
                type="button"
                onClick={() => {
                  setPicturePreview(null);
                  setFormData(prev => ({ ...prev, profilePicture: null }));
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked }))}
            className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Set as active delivery person
          </span>
        </label>
        <p className="text-sm text-gray-500 mt-1">
          Active delivery persons will be available for order assignments
        </p>
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
          className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add Delivery Person
        </button>
      </div>
    </form>
  );
}