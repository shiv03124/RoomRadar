import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logoimage.png';
import ProfileDropdown from '../ProfileDropdown';
import AddRoomModal from '../rooms/AddRoomModal';
import toast from 'react-hot-toast';

const Header = ({ userData, setUserData, className = "", style = {} }) => {
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const role = userData?.role || sessionStorage.getItem("role");
  const activeTab = location.pathname;

  const handleAddRoomClick = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add a room");
      navigate('/login');
      return;
    }
    setShowAddRoomModal(true);
  };

  const handleRoomAdded = () => {
    setShowAddRoomModal(false);
  };

  return (
    <>
      {/* Top header: Logo + Profile only on mobile */}
      <nav className={`bg-white shadow-sm flex items-center justify-between px-4 h-16 sm:hidden ${className}`} style={style}>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <img
            src={logo}
            alt="RoomRadar Logo"
            className="h-10 w-auto object-contain scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
              e.target.parentElement.innerHTML = `<span class="text-2xl font-bold text-red-600">RoomRadar</span>`;
            }}
          />
        </div>
        <ProfileDropdown userData={userData} setUserData={setUserData} />
      </nav>

      {/* Bottom sticky tabs bar on mobile */}
      {role === "user" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md flex justify-around items-center h-16 sm:hidden z-50">
          <button
            onClick={() => navigate('/dashboard')}
            className={`text-sm font-medium px-3 py-1 rounded-md ${
              activeTab.includes('/listings/all')
                ? 'bg-[#0662B7] text-white shadow'
                : 'text-gray-700 hover:bg-[#0662B7] hover:text-white'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => navigate('/listings/My Listings')}
            className={`text-sm font-medium px-3 py-1 rounded-md ${
              activeTab.includes('/listings/mine')
                ? 'bg-[#0662B7] text-white shadow'
                : 'text-gray-700 hover:bg-[#0662B7] hover:text-white ' 
            }`}
          >
            My Listings
          </button>
          <button
            onClick={() => navigate('/listings/applied')}
            className={`text-sm font-medium px-3 py-1 rounded-md ${
              activeTab.includes('/listings/applied')
                ? 'bg-[#0662B7] text-white shadow'
                : 'text-gray-700 hover:bg-gray-100 hover:text-white'
            }`}
          >
            Applied Rooms
          </button>
          <button
            onClick={handleAddRoomClick}
            className="bg-[#0662B7] hover:bg-indigo-600 text-white px-4 py-1 rounded-md text-sm font-medium"
          >
            Add
          </button>
        </div>
      )}

      {/* Desktop Header: show everything */}
      <nav className={`hidden sm:block bg-white shadow-sm ${className}`} style={style}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <img
                src={logo}
                alt="RoomRadar Logo"
                className="h-10 w-auto object-contain scale-110 sm:scale-125"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '';
                  e.target.parentElement.innerHTML = `<span class="text-2xl font-bold text-red-600">RoomRadar</span>`;
                }}
              />
            </div>

            {/* Tabs + Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {role === "user" ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className={`text-sm sm:text-base px-3 py-1.5 rounded-md font-medium ${
                      activeTab.includes('/listings/all')
                        ? 'bg-[#0662B7] text-white shadow'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    All Listings
                  </button>
                  <button
                    onClick={() => navigate('/listings/My Listings')}
                    className={`text-sm sm:text-base px-3 py-1.5 rounded-md font-medium ${
                      activeTab.includes('/listings/mine')
                        ? 'bg-[#0662B7] text-white shadow'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    My Listings
                  </button>
                  <button
                    onClick={() => navigate('/listings/applied')}
                    className={`text-sm sm:text-base px-3 py-1.5 rounded-md font-medium ${
                      activeTab.includes('/listings/applied')
                        ? 'bg-[#0662B7] text-white shadow'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Applied Rooms
                  </button>
                  <button
                    onClick={handleAddRoomClick}
                    className="bg-[#0662B7] hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Add Room
                  </button>
                  <ProfileDropdown userData={userData} setUserData={setUserData} />
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-[#0662B7] text-white rounded-md text-sm hover:bg-indigo-600"
                >
                  Login / Sign up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showAddRoomModal && (
        <AddRoomModal
          onClose={() => setShowAddRoomModal(false)}
          onRoomAdded={handleRoomAdded}
          userData={userData}
        />
      )}
    </>
  );
};

export default Header;
