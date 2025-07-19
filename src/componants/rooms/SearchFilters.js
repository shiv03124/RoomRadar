import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import close from '../images/close.png';
import {
  FaWifi, FaSwimmingPool, FaDumbbell, FaParking, FaSnowflake,
  FaFire, FaTv, FaCouch, FaUserShield,
} from 'react-icons/fa';
import { GiWashingMachine } from 'react-icons/gi';
import { MdKitchen, MdElevator } from 'react-icons/md';

const SearchFilters = ({
  filters = {
    city: '',
    area: '',
    minVacancies: 1,
    maxVacancies: 5,
    minRent: 0,
    maxRent: 10000,
    preferredGender: '',
    amenities: []
  },
  onFilterChange,
  onSubmit,
  onReset,
  activeTab,
  onShowAllRooms,
  isLoading = false,
  onClose
}) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" })
        });
        const data = await res.json();
        if (data.data) {
          setCities(data.data.sort());
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  const normalizedAmenities = Array.isArray(filters.amenities)
    ? filters.amenities
    : filters.amenities ? [filters.amenities] : [];

  const amenitiesOptions = [
    { id: 'wifi', label: 'Wi-Fi', icon: <FaWifi className="text-blue-500" /> },
    { id: 'pool', label: 'Pool', icon: <FaSwimmingPool className="text-blue-400" /> },
    { id: 'gym', label: 'Gym', icon: <FaDumbbell className="text-red-500" /> },
    { id: 'parking', label: 'Parking', icon: <FaParking className="text-gray-600" /> },
    { id: 'ac', label: 'AC', icon: <FaSnowflake className="text-blue-300" /> },
    { id: 'heater', label: 'Heater', icon: <FaFire className="text-orange-500" /> },
    { id: 'laundry', label: 'Laundry', icon: <GiWashingMachine className="text-indigo-500" /> },
    { id: 'kitchen', label: 'Kitchen', icon: <MdKitchen className="text-yellow-500" /> },
    { id: 'tv', label: 'TV', icon: <FaTv className="text-purple-500" /> },
    { id: 'furnished', label: 'Furnished', icon: <FaCouch className="text-amber-500" /> },
    { id: 'security', label: 'Security', icon: <FaUserShield className="text-green-600" /> },
    { id: 'elevator', label: 'Elevator', icon: <MdElevator className="text-gray-700" /> }
  ];

  const genderOptions = [
    { value: '', label: 'Any Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  const handleSliderChange = (value, key) => {
    onFilterChange({ target: { name: key, value } });
  };

  const handleRentInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value.replace(/^0+/, '') || '0', 10);
    onFilterChange({ target: { name, value: isNaN(parsedValue) ? '' : parsedValue } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleAmenityClick = (amenityId) => {
    const newAmenities = normalizedAmenities.includes(amenityId)
      ? normalizedAmenities.filter(item => item !== amenityId)
      : [...normalizedAmenities, amenityId];

    onFilterChange({ target: { name: 'amenities', value: newAmenities } });
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 hover:opacity-80"
          aria-label="Close Filters"
        >
          <img src={close} alt="Close" className="w-5 h-5" />
        </button>
      )}

      <h3 className="text-lg font-medium text-gray-900 mb-4">Search Filters</h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* City Dropdown from API */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <select
              id="city"
              name="city"
              value={filters.city}
              onChange={onFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              disabled={activeTab !== 'All Listings'}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Rent Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rent Range: ₹{filters.minRent || 0} - ₹{filters.maxRent || 0}
            </label>
            <div className="px-3">
              <Slider
                range
                min={0}
                max={10000}
                step={500}
                value={[filters.minRent || 0, filters.maxRent || 10000]}
                onChange={(value) => {
                  handleSliderChange(value[0], 'minRent');
                  handleSliderChange(value[1], 'maxRent');
                }}
                trackStyle={[{ backgroundColor: '#3b82f6' }]}
                handleStyle={[
                  { borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
                  { borderColor: '#3b82f6', backgroundColor: '#3b82f6' }
                ]}
                railStyle={{ backgroundColor: '#e5e7eb' }}
              />
            </div>
          </div>

          {/* Vacancy Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vacancies: {filters.minVacancies} - {filters.maxVacancies}
            </label>
            <div className="px-3">
              <Slider
                range
                min={1}
                max={5}
                step={1}
                value={[filters.minVacancies, filters.maxVacancies]}
                onChange={(value) => {
                  handleSliderChange(value[0], 'minVacancies');
                  handleSliderChange(value[1], 'maxVacancies');
                }}
                trackStyle={[{ backgroundColor: '#3b82f6' }]}
                handleStyle={[
                  { borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
                  { borderColor: '#3b82f6', backgroundColor: '#3b82f6' }
                ]}
                railStyle={{ backgroundColor: '#e5e7eb' }}
              />
            </div>
          </div>
        </div>

        {/* Area, Gender, Min/Max Rent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area/Locality</label>
            <input
              type="text"
              id="area"
              name="area"
              value={filters.area}
              onChange={onFilterChange}
              placeholder="e.g. Shivaji Nagar"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              disabled={activeTab !== 'All Listings'}
            />
          </div> */}

          <div>
            <label htmlFor="preferredGender" className="block text-sm font-medium text-gray-700">Preferred Gender</label>
            <select
              id="preferredGender"
              name="preferredGender"
              value={filters.preferredGender}
              onChange={onFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
              disabled={activeTab !== 'All Listings'}
            >
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minRent" className="block text-sm font-medium text-gray-700 mb-1">Min Rent</label>
              <input
                type="number"
                id="minRent"
                name="minRent"
                value={filters.minRent}
                onChange={handleRentInputChange}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700 mb-1">Max Rent</label>
              <input
                type="number"
                id="maxRent"
                name="maxRent"
                value={filters.maxRent}
                onChange={handleRentInputChange}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                placeholder="10000"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <legend className="block text-sm font-medium text-gray-700 mb-2">Amenities</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {amenitiesOptions.map(amenity => (
              <div
                key={amenity.id}
                onClick={() => handleAmenityClick(amenity.id)}
                className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center space-x-2
                  ${normalizedAmenities.includes(amenity.id)
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="text-lg">{amenity.icon}</div>
                <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Reset Filters
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Searching...
              </>
            ) : 'Search Rooms'}
          </button>
        </div>
      </form>
    </div>
  );
};

SearchFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onShowAllRooms: PropTypes.func,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func
};

export default SearchFilters;
