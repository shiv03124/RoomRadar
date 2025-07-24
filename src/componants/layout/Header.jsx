import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoimage.png';
import ProfileDropdown from '../ProfileDropdown';
import AddRoomModal from '../rooms/AddRoomModal';
import toast from 'react-hot-toast';

const Header = ({ userData, setUserData, className = "", style = {} }) => {
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const navigate = useNavigate();

  const role = userData?.role || sessionStorage.getItem("role");

  const handleAddRoomClick = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add a room");
      navigate('/login');
      return;
    }
    setShowAddRoomModal(true);
  };

  const handleRoomAdded = (room) => {
    setShowAddRoomModal(false);
    // toast.success("Room added successfully!");
  };

  return (
    <nav className={`bg-white shadow-sm ${className}`} style={style}>
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between  h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-10 flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
              <img
  src={logo}
  alt="RoomRadar Logo"
  className="h-full w-auto object-contain scale-110 sm:scale-125 transition-transform duration-200"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '';
    e.target.parentElement.innerHTML = `
      <span class="text-2xl font-bold text-red-600">
        RoomRadar
      </span>
    `;
  }}
/>

            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {role === 'admin' ? null : role === 'user' ? (
              <>
                <button
                  onClick={handleAddRoomClick}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0662B7] text-white rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  Add Room
                </button>
                <ProfileDropdown userData={userData} setUserData={setUserData} />
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0662B7] text-white rounded-md text-xs sm:text-sm font-medium hover:bg-indigo-600 transition-colors"
              >
                Login / Sign up
              </button>
            )}
          </div>
        </div>
      </div>

      {showAddRoomModal && (
        <AddRoomModal
          onClose={() => setShowAddRoomModal(false)}
          onRoomAdded={handleRoomAdded}
          userData={userData}
        />
      )}
    </nav>
  );
};

export default Header;