import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ userData, setUserData }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login'); 
  };

  return (
    <div className="ml-4 relative"  ref={dropdownRef}>
      <button
        onClick={handleProfileClick}
        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-expanded={profileOpen}
        aria-haspopup="true"
      >
       <img
  className="h-8 w-8 rounded-full"
  src={
    userData?.profileImageUrl?.trim()
      ? userData.profileImageUrl
      : 'http://randomuser.me/api/portraits/men/1.jpg'
  }
  alt="User profile"
/>

      </button>

      {profileOpen && (
       <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
            <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setProfileOpen(false)}
          >
            Your Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;