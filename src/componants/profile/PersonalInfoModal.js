import React from 'react';
import PropTypes from 'prop-types';
import { FiWifi, FiUser, FiCoffee } from 'react-icons/fi';
import { MdSmokeFree, MdPets, MdFastfood } from 'react-icons/md';

const PersonalInfoModal = ({ 
  isEditing, 
  formData, 
  handleInputChange, 
  isUpdating 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const getPreferenceIcon = (pref) => {
  switch (pref.toLowerCase()) {
    case 'wifi':
      return <FiWifi className="text-indigo-600" />;
    case 'non-smoker':
      return <MdSmokeFree className="text-indigo-600" />;
    case 'vegetarian':
      return <MdFastfood className="text-green-600" />;
    case 'pet-friendly':
      return <MdPets className="text-yellow-600" />;
    case 'early riser':
      return <FiCoffee className="text-orange-600" />;
    case 'same gender':
      return <FiUser className="text-blue-600" />;
    default:
      return <FiUser className="text-gray-500" />;
  }
};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          {isEditing ? (
            <input
              type="text"
              name="full_Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formData.fullName}</p>
          )}
        </div>

        {/* Other fields follow the same pattern */}
        {/* Email */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
          )}
        </div>

        {/* Preferences */}
<div className="sm:col-span-6">
  <label className="block text-sm font-medium text-gray-700">Preferences</label>
  {isEditing ? (
    <p className="mt-1 text-sm text-gray-500">Preference editing not supported here.</p>
  ) : (
    <div className="mt-2 flex flex-wrap gap-3">
      {formData.preferences && formData.preferences.length > 0 ? (
        formData.preferences.map((pref, idx) => (
          <div
            key={idx}
            className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
          >
            {getPreferenceIcon(pref)}
            <span className="ml-2">{pref}</span>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-900">Not specified</p>
      )}
    </div>
  )}
</div>


        {/* Phone */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formData.phone || 'Not specified'}</p>
          )}
        </div>

        {/* Gender */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          {isEditing ? (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formData.gender || 'Not specified'}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formatDate(formData.dateOfBirth)}</p>
          )}
        </div>

        {/* Current City */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Current City</label>
          {isEditing ? (
            <input
              type="text"
              name="currentCity"
              value={formData.currentCity}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formData.currentCity || 'Not specified'}</p>
          )}
        </div>

        {/* Address */}
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          {isEditing ? (
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{formData.address || 'Not specified'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

PersonalInfoModal.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default PersonalInfoModal;