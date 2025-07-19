import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiPhone, FiMail, FiCalendar, FiMapPin,
  FiHome, FiCheck, FiX, FiLock, FiEdit, FiSave, 
  FiArrowLeft
} from 'react-icons/fi';
import { FaRegSmile, FaBed, FaDog, FaCarrot } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { MdOutlineSmokeFree } from 'react-icons/md';
import { fetchUserProfile, updateUserProfile } from '../utils/fetchUserProfile';
import { SuccessToast, LoadingToast, ErrorToast } from '../Toster/ToastMessages';
import toast from 'react-hot-toast';

import profile from '../images/profile.png';
import maleFallback from '../images/profile.png';
import femaleFallback from '../images/woman.png';

const preferenceIconMap = {
  'Vegetarian': <FaCarrot />,
  'Non-Vegetarian': <FaRegSmile />,
  'Early Riser': <FaBed />,
  'Night Owl': <GiNightSleep />,
  'Non-Smoker': <MdOutlineSmokeFree />,
  'Smoker': <FiX />,
  'Pet Friendly': <FaDog />,
  'Cleanliness': <FiCheck />,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
        setFormData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          gender: userData.gender || '',
          dateOfBirth: userData.dateOfBirth || '',
          address: userData.address || '',
          currentCity: userData.currentCity || '',
          profileImageUrl: userData.profileImageUrl || ''
        });
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    setImgError(false);
  }, [formData.profileImageUrl, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const toastId = toast.custom((t) => <LoadingToast message="Updating profile..." />);
    try {
      const updatedUser = await updateUserProfile(formData, user.id, selectedImage);
      setUser(updatedUser);
      setEditing(false);
      setSelectedImage(null);
      toast.dismiss(toastId);
      toast.custom((t) => <SuccessToast message="Profile updated successfully" />);
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error updating profile:", error);
      toast.custom((t) => <ErrorToast message="Failed to update profile" />);
    }
  };

  const getFallbackImage = () => {
    const gender = editing ? formData.gender?.toLowerCase() : user.gender?.toLowerCase();
    if (gender === 'male') return maleFallback;
    if (gender === 'female') return femaleFallback;
    return profile;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-50">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Profile not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-8 top-0"
    >
      <div className="max-w-4xl py-2 mx-auto">
        {/* Back Button - Mobile Only */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="md:hidden flex items-center text-indigo-600 mb-4"
        >
          <FiArrowLeft className="mr-1" />
          Back to Dashboard
        </button>

        {/* Profile Header */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-6 relative"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6 text-white">
            <div className="flex justify-between items-start">
              {/* Back Button - Desktop Only */}
              <button 
                onClick={() => navigate('/dashboard')}
                className="hidden md:flex items-center text-white bg-white bg-opacity-20 px-3 py-1 rounded-full"
              >
                <FiArrowLeft className="mr-1" />
                Dashboard
              </button>

              {editing ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-green-100 transition-colors"
                >
                  <FiSave className="text-lg" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditing(true)}
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <FiEdit className="text-lg" />
                </motion.button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                {(selectedImage || (user.profileImageUrl && !imgError)) ? (
                  <img
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    src={selectedImage ? URL.createObjectURL(selectedImage) : user.profileImageUrl}
                    alt="Profile"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                    <img
                      src={getFallbackImage()}
                      alt="Gender fallback avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {editing && (
                  <>
                    <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-full p-1 sm:p-2 shadow-md transition cursor-pointer">
                      <FiEdit className="text-white text-sm sm:text-base" />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setSelectedImage(file);
                          const previewUrl = URL.createObjectURL(file);
                          setFormData(prev => ({ ...prev, profileImageUrl: previewUrl }));
                          setImgError(false);
                        }
                      }}
                      className="hidden"
                      id="profileImageInput"
                    />
                  </>
                )}
              </motion.div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {editing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-white bg-opacity-20 border-b border-white focus:outline-none w-full max-w-xs"
                      placeholder="Full Name"
                    />
                  ) : (
                    user.fullName
                  )}
                </h2>
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-indigo-100 text-sm mt-1">
                  <FiPhone />
                  <p>{user.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Info */}
          <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <FiUser className="mr-2 text-indigo-500" /> Personal Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
                <ProfileField
                  icon={<FiMail className="text-indigo-500" />}
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  editing={false} // Email shouldn't be editable
                />
                <ProfileField
                  icon={<FiUser className="text-indigo-500" />}
                  label="Gender"
                  name="gender"
                  value={editing ? formData.gender : user.gender}
                  editing={editing}
                  onChange={handleInputChange}
                />
              </div>
              <ProfileField
                icon={<FiCalendar className="text-indigo-500" />}
                label="Date of Birth"
                name="dateOfBirth"
                value={editing ? formData.dateOfBirth : user.dateOfBirth}
                editing={editing}
                onChange={handleInputChange}
                type="date"
              />
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <FiMapPin className="mr-2 text-indigo-500" /> Location Information
            </h3>
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
              <ProfileField
                icon={<FiMapPin className="text-indigo-500" />}
                label="Address"
                name="address"
                value={editing ? formData.address : user.address}
                editing={editing}
                onChange={handleInputChange}
              />
              <ProfileField
                icon={<FiHome className="text-indigo-500" />}
                label="Current City"
                name="currentCity"
                value={editing ? formData.currentCity : user.currentCity}
                editing={editing}
                onChange={handleInputChange}
              />
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-md md:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <FiUser className="mr-2 text-indigo-500" /> Preferences
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {user.preferences?.map((pref, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-indigo-500 bg-indigo-50 text-indigo-700 text-xs sm:text-sm shadow-sm"
                >
                  {preferenceIconMap[pref] && <span className="text-sm sm:text-base">{preferenceIconMap[pref]}</span>}
                  <span>{pref}</span>
                </div>
              ))}
              {(!user.preferences || user.preferences.length === 0) && (
                <p className="text-gray-500 text-sm">No preferences selected.</p>
              )}
            </div>
          </motion.div>

          {/* User Activity */}
          <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-md md:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <FiHome className="mr-2 text-indigo-500" /> Your Activity
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-500">Rooms Listed</p>
                <p className="text-gray-700 font-medium text-lg">{user.rooms?.length || 0}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-500">Applications Sent</p>
                <p className="text-gray-700 font-medium text-lg">{user.applications?.length || 0}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-500">Approved</p>
                <p className="text-gray-700 font-medium text-lg">
                  {user.applications?.filter(app => app.status === 'approved').length || 0}
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-500">Pending</p>
                <p className="text-gray-700 font-medium text-lg">
                  {user.applications?.filter(app => app.status === 'pending').length || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {editing && (
          <motion.div 
            className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setEditing(false)}
              className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ProfileField = ({ icon, label, name, value, editing, onChange, type = 'text' }) => (
  <div className="w-full">
    <p className="text-xs sm:text-sm text-gray-500 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </p>
    {editing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-1 sm:p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-sm sm:text-base"
      />
    ) : (
      <p className="mt-1 text-gray-700 text-sm sm:text-base">{value || 'Not provided'}</p>
    )}
  </div>
);

export default ProfilePage;