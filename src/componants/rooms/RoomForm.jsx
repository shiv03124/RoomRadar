import { MdMicrowave } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from "react";
import { 
  FiWifi, 
  FiAirplay, 
  FiWatch, 
  FiHome, 
  FiMapPin, 
  FiDroplet,
  FiCheckCircle
} from 'react-icons/fi';

const RoomForm = ({
  room, setRoom, onSubmit, onCancel, submitButtonText, isEditing = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({
    rent: false,
    securityDeposit: false
  });

  useEffect(() => {
  const fetchCities = async () => {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" })
    });

    const data = await res.json();
    if (data.data) {
      setCities(data.data.sort());
    }
  };

  fetchCities();
}, []);


  const availableAmenities = [
    { name: 'Wi-Fi', icon: <FiWifi className="text-blue-500" size={18} /> },
    { name: 'Air Conditioning', icon: <FiAirplay className="text-blue-400" size={18} /> },
    { name: 'Washing Machine', icon: <FiWatch className="text-indigo-500" size={18} /> },
    { name: 'Refrigerator', icon: <MdMicrowave className="text-green-500" size={18} /> },
    { name: 'TV', icon: <FiHome className="text-red-500" size={18} /> },
    { name: 'Microwave', icon: <MdMicrowave className="text-orange-500" size={18} /> },
    { name: 'Furniture', icon: <FiHome className="text-amber-500" size={18} /> },
    { name: 'Parking', icon: <FiMapPin className="text-gray-600" size={18} /> },
    { name: 'Gym', icon: <FiDroplet className="text-purple-500" size={18} /> },
    { name: 'Swimming Pool', icon: <FiDroplet className="text-blue-300" size={18} /> }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validate numbers when they change
    if (name === 'rent' || name === 'securityDeposit') {
      const numValue = parseInt(value, 10);
      setErrors(prev => ({
        ...prev,
        [name]: numValue < 0
      }));
    }
    
    setRoom(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setRoom(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return {
        ...prev,
        amenities: newAmenities
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 50 * 1024 * 1024; // 50 MB in bytes
    const validFiles = files.filter(file => {
      if (file.size > maxFileSize) {
        alert(`"${file.name}" exceeds 50MB and will not be added.`);
        return false;
      }
      return true;
    });

    setRoom(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));
  };

  const handleRemoveImage = (index) => {
    setRoom(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate rent and deposit
    const rentValid = parseInt(room.rent, 10) > 0;
    const depositValid = room.securityDeposit === '' || parseInt(room.securityDeposit, 10) >= 0;
    
    setErrors({
      rent: !rentValid,
      securityDeposit: !depositValid
    });
    
    if (rentValid && depositValid) {
      onSubmit(e);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
        {/* Title */}
        <div className="sm:col-span-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title<span className="text-red-500">*</span>
          </label>
          <motion.input
            type="text"
            name="title"
            id="title"
            value={room.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            whileFocus={{ boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)" }}
            required
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={room.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        {/* Address */}
       <div className="sm:col-span-6">
  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
    Address<span className="text-red-500">*</span>
  </label>
  <textarea
    name="address"
    id="address"
    value={room.address}
    onChange={handleInputChange}
    rows={3} // You can increase rows if you want more space
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border resize-y"
    required
  ></textarea>
</div>


       <div className="sm:col-span-3">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City<span className="text-red-500">*</span>
          </label>
          <select
  name="city"
  id="city"
  value={room.city}
  onChange={handleInputChange}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
  required
>
  <option value="">Select City</option>
  {cities.map((city, index) => (
    <option key={index} value={city}>{city}</option>
  ))}
</select>

        </div> 
        
        <div className="sm:col-span-3">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
            Landmark<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="area"
            id="area"
            value={room.area}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            required
          />
        </div>
        
        {/* Accommodation Type and Configuration */}
        <div className="sm:col-span-3">
          <label htmlFor="accommodationType" className="block text-sm font-medium text-gray-700 mb-1">
            Accommodation Type<span className="text-red-500">*</span>
          </label>
          <select
            name="accommodationType"
            id="accommodationType"
            value={room.accommodationType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            required
          >
            <option value="PG">PG</option>
            <option value="Hostel">Hostel</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {room.accommodationType === 'Flat' && (
          <div className="sm:col-span-3">
            <label htmlFor="configuration" className="block text-sm font-medium text-gray-700 mb-1">
              Configuration<span className="text-red-500">*</span>
            </label>
            <select
              name="configuration"
              id="configuration"
              value={room.configuration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
            >
              <option value="">Select Configuration</option>
              <option value="1RK">1RK</option>
              <option value="1BHK">1BHK</option>
              <option value="2bhk">2bhk</option>
              <option value="2bhk">3bhk</option>
            </select>
          </div>
        )}

{room.accommodationType === 'Flat' && (
  <div className="sm:col-span-3">
    <label htmlFor="totalNoOfPeoples" className="block text-sm font-medium text-gray-700 mb-1">
      Total No. of People<span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      name="totalNoOfPeoples"
      id="totalNoOfPeoples"
      value={room.totalNoOfPeoples}
      onChange={handleInputChange}
      min="1"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
      required
    />
  </div>
)}

        {/* Vacancies and Furnished */}
        <div className="sm:col-span-3">
          <label htmlFor="noofvacancies" className="block text-sm font-medium text-gray-700 mb-1">
            No. of Vacancies<span className="text-red-500">*</span>
          </label>
          <select
            name="noofvacancies"
            id="noofvacancies"
            value={room.noofvacancies}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            required
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="furnished" className="block text-sm font-medium text-gray-700 mb-1">
            Furnished<span className="text-red-500">*</span>
          </label>
          <select
            name="furnished"
            id="furnished"
            value={room.furnished}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            required
          >
            <option value="Fully">Fully Furnished</option>
            <option value="Semi">Semi Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        {/* Available From and Preferred Gender */}
        <div className="sm:col-span-3">
          <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-1">
            Available From<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="availableFrom"
            id="availableFrom"
            value={room.availableFrom}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            required
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="preferredGender" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Gender<span className="text-red-500">*</span>
          </label>
          <select
            name="preferredGender"
            id="preferredGender"
            value={room.preferredGender}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          >
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Rent and Deposit */}
        <div className="sm:col-span-3">
          <label htmlFor="rent" className="block text-sm font-medium text-gray-700 mb-1">
            Rent/Person (₹)<span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              name="rent"
              id="rent"
              value={room.rent}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
              min="1"
              onWheel={(e) => e.target.blur()} // Prevent mouse wheel from changing the value
              style={{ appearance: 'textfield' }} // Hide number input arrows
            />
            {errors.rent && (
              <p className="mt-1 text-sm text-red-600">Rent must be greater than 0</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700 mb-1">
            Security Deposit/Person<span className="text-red-500">*</span> (₹)
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              name="securityDeposit"
              id="securityDeposit"
              value={room.securityDeposit}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              min="0"
              onWheel={(e) => e.target.blur()} // Prevent mouse wheel from changing the value
              style={{ appearance: 'textfield' }} // Hide number input arrows
            />
            {errors.securityDeposit && (
              <p className="mt-1 text-sm text-red-600">Deposit cannot be negative</p>
            )}
          </div>
        </div>

        {/* Is Available */}
        <div className="sm:col-span-2 flex items-end">
  <div className="flex items-center h-10 mt-5">
    <label htmlFor="isAvailable" className="mr-3 block text-sm text-gray-900">
      Is Available   
    </label> 
    <button
      type="button"
      onClick={() => handleInputChange({ target: { name: 'isAvailable', type: 'checkbox', checked: !room.isAvailable } })}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        room.isAvailable ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          room.isAvailable ? 'translate-x-6' : 'translate-x-1'
        }`}
      >
        {room.isAvailable ? (
          <FiCheckCircle className="h-full w-full p-1 text-green-500" />
        ) : (
          <svg
            className="h-full w-full p-1 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </span>
    </button>
    
  </div>
</div>

        {/* Amenities */}
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableAmenities.map(({name, icon}) => (
              <motion.div 
                key={name}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center p-2 rounded-md border cursor-pointer transition-colors ${
                  room.amenities.includes(name) 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleAmenityChange(name)}
              >
                <div className="mr-2">
                  {icon}
                </div>
                <span className="text-sm">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Images */}
       <div className="sm:col-span-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Images<span className="text-red-700">*</span> {imageError && <span className="text-red-500 text-xs">(At least one image is required)</span>}
  </label>
  
  <div className="flex flex-wrap items-center gap-2">
    {/* Upload Area */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex-shrink-0"
    >
      <label className="flex flex-col items-center justify-center h-24 w-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
  <div className="flex flex-col items-center justify-center p-2">
          <svg className="w-5 h-5 mb-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <p className="text-xs text-gray-500 text-center">Add</p>
        </div>
        <input 
          type="file" 
          multiple 
          onChange={handleImageChange} 
          className="hidden" 
          accept="image/*"
          required={room.images.length === 0}
        />
      </label>
    </motion.div>

    {/* Image Previews - Dynamic sizing based on count */}
    {room.images.map((img, index) => (
      <motion.div 
        key={index} 
        className={`relative flex-shrink-0 ${
          room.images.length > 5 ? 'h-20 w-20' : 'h-24 w-24'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={typeof img === 'string' ? img : URL.createObjectURL(img)} 
          alt={`Preview ${index}`} 
          className="h-full w-full object-cover rounded-md border border-gray-200"
        />
        <motion.button
          type="button"
          onClick={() => handleRemoveImage(index)}
          className="absolute -top-2 -right-2 bg-gray-200 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs"
          whileHover={{ scale: 1.1 }}
        >
          ×
        </motion.button>
      </motion.div>
    ))}
  </div>

  {/* Show count when many images */}
  {room.images.length > 8 && (
    <div className="mt-2 text-xs text-gray-500">
      Showing 8 of {room.images.length} images (scroll horizontally to view more)
    </div>
  )}
</div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border bg-gray-200 border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Close
        </motion.button>
        <motion.button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {submitButtonText}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default RoomForm;