import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAdminByEmail, updateRoomStatus } from '../utils/roomService';
import Sidebar from '../layout/Adminsidebar';
import StatsOverview from '../Stats/StatsOverview';
import RoomTable from '../rooms/RoomTable';
import RoomTabs from '../rooms/RoomTabs';
import RoomList from '../rooms/RoomList';
import RoomDetailsModal from '../rooms/RoomDetailsModal';
import { fetchRooms } from '../utils/fetchUserProfile';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminDashboard = ({ userData }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const data = await fetchRooms(`'https://roomradarbackend.onrender.com/api/rooms/getAllRoomsWithoutApprove`);
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const handleStatusUpdate = async (roomId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const adminEmail = sessionStorage.getItem('email');

      const admin = await fetchAdminByEmail(adminEmail, token);
      await updateRoomStatus(roomId, newStatus, admin.id, token);

      setRooms(prev =>
        prev.map(room => room.id === roomId ? { ...room, status: newStatus } : room)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const approvedRooms = rooms.filter(r => r.status === 'APPROVED');
  const pendingRooms = rooms.filter(r => r.status === 'PENDING');
  const rejectedRooms = rooms.filter(r => r.status === 'REJECTED');
  const filteredRooms = {
    pending: pendingRooms,
    approved: approvedRooms,
    rejected: rejectedRooms,
    all: rooms,
  }[activeTab];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="p-6 max-w-md bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar with responsive behavior */}
      <div
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${!isMobile ? 'translate-x-0' : ''}
        fixed md:static z-40 w-64 h-full transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <StatsOverview
          pendingCount={pendingRooms.length}
          approvedCount={approvedRooms.length}
          totalCount={rooms.length}
        />

        <RoomTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            pending: pendingRooms.length,
            approved: approvedRooms.length,
            rejected: rejectedRooms.length,
            all: rooms.length,
          }}
        />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rooms
          </h2>
          <button
            onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
            className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm md:text-base"
          >
            {viewMode === 'table' ? 'Card View' : 'Table View'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          {filteredRooms.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No rooms found in this category
            </div>
          ) : viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <RoomTable 
                rooms={filteredRooms} 
                onStatusChange={handleStatusUpdate} 
                isMobile={isMobile}
              />
            </div>
          ) : (
            <RoomList
              rooms={filteredRooms}
              loading={false}
              error={null}
              activeTab={activeTab}
              onViewDetails={setSelectedRoom}
              isAppliedView={false}
            />
          )}
        </motion.div>

        {selectedRoom && (
          <RoomDetailsModal
            room={selectedRoom}
            activeTab={activeTab}
            onClose={() => setSelectedRoom(null)}
            onEdit={() => {}}
            onDelete={(deletedRoomId) => {
              setRooms(prev => prev.filter(r => r.id !== deletedRoomId));
              setSelectedRoom(null);
            }}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;