import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAdminByEmail, updateRoomStatus } from '../utils/roomService';
import Sidebar from '../layout/Adminsidebar';
import StatsOverview from '../Stats/StatsOverview';
import RoomTabs from '../rooms/RoomTabs';
import { fetchRooms } from '../utils/fetchUserProfile';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../rooms/RoomCard';

const RoomTable = ({ 
  rooms, 
  onStatusChange, 
  isMobile, 
  onViewDetails, 
  expandedRoomId 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRooms = [...rooms].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const renderStatusActions = (room) => {
    switch(room.status) {
      case 'APPROVED':
        return (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(room.id, 'PENDING');
              }}
              className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Set Pending
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(room.id, 'REJECTED');
              }}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reject
            </button>
          </>
        );
      case 'PENDING':
        return (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(room.id, 'APPROVED');
              }}
              className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(room.id, 'REJECTED');
              }}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reject
            </button>
          </>
        );
      case 'REJECTED':
        return (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(room.id, 'APPROVED');
              }}
              className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(room.id, 'PENDING');
              }}
              className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Set Pending
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      {isMobile ? (
        <div className="space-y-4 p-2">
          {sortedRooms.map((room) => (
            <div key={room.id} className="border rounded-lg overflow-hidden">
              <div 
                className="p-3 bg-white hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewDetails(room.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{room.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    room.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    room.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {room.status}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Rent</p>
                    <p>₹{room.rent}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Deposit</p>
                    <p>₹{room.securityDeposit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <p>{room.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Area</p>
                    <p>{room.area}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between space-x-2">
                  {renderStatusActions(room)}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(room.id);
                    }}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {expandedRoomId === room.id ? 'Hide' : 'View'}
                  </button>
                </div>
              </div>
              
              {expandedRoomId === room.id && (
                <div className="p-3 bg-gray-50 border-t">
                  <div className="text-sm space-y-2">
                    <p><span className="font-medium">Description:</span> {room.description}</p>
                    <p><span className="font-medium">Owner:</span> {room.user?.fullName}</p>
                    <p><span className="font-medium">Contact:</span> {room.user?.phone}</p>
                    <p><span className="font-medium">Created:</span> {new Date(room.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('title')}
              >
                Title {sortConfig.key === 'title' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('city')}
              >
                Location {sortConfig.key === 'city' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('rent')}
              >
                Rent {sortConfig.key === 'rent' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('status')}
              >
                Status {sortConfig.key === 'status' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRooms.map((room) => (
              <React.Fragment key={room.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {room.images?.[0] ? (
                          <img className="h-10 w-10 rounded-full object-cover" src={room.images[0]} alt="" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{room.title}</div>
                        <div className="text-sm text-gray-500">{room.area}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{room.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{room.rent}</div>
                    <div className="text-sm text-gray-500">Deposit: ₹{room.securityDeposit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      room.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      room.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {renderStatusActions(room)}
                      <button
                        onClick={() => onViewDetails(room.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {expandedRoomId === room.id ? 'Hide' : 'View'}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRoomId === room.id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Description</h4>
                          <p className="text-sm text-gray-600">{room.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Owner Details</h4>
                          <p className="text-sm text-gray-600">{room.user?.fullName}</p>
                          <p className="text-sm text-gray-600">{room.user?.email}</p>
                          <p className="text-sm text-gray-600">{room.user?.phone}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Room Info</h4>
                          <p className="text-sm text-gray-600">Type: {room.accommodationType}</p>
                          <p className="text-sm text-gray-600">Furnished: {room.furnished}</p>
                          <p className="text-sm text-gray-600">Created: {new Date(room.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const AdminDashboard = ({ userData }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [viewMode, setViewMode] = useState('table');
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedRoomId, setExpandedRoomId] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //     if (window.innerWidth >= 768) {
  //       setSidebarOpen(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || !email) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms(`https://roomradarbackend.onrender.com/api/rooms/getAllRoomsForAdmin`);
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
      const token = localStorage.getItem('token');
      const adminEmail = localStorage.getItem('email');

      const admin = await fetchAdminByEmail(adminEmail, token);
      await updateRoomStatus(roomId, newStatus, admin.id, token);

      setRooms(prev =>
        prev.map(room => room.id === roomId ? { ...room, status: newStatus } : room)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleViewDetails = (roomId) => {
    setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
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
    <div className="flex h-screen bg-gray-50 relative pt-14">
      {/* {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )} */}

      {/* <div
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${!isMobile ? 'translate-x-0' : ''}
        fixed md:static z-40 w-64 h-full transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && isMobile && ( 
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )} */}

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
            <RoomTable 
              rooms={filteredRooms} 
              onStatusChange={handleStatusUpdate} 
              isMobile={isMobile}
              onViewDetails={handleViewDetails}
              expandedRoomId={expandedRoomId}
            />
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredRooms.map(room => (
                  <div key={room.id} className="w-full">
                    <RoomCard
                      room={room}
                      activeTab={activeTab}
                      isAppliedView={false}
                      isExpanded={expandedRoomId === room.id}
                      onViewDetails={() => handleViewDetails(room.id)}
                      onCloseDetails={() => setExpandedRoomId(null)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;