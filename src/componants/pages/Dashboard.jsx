import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

import RoomCard from '../rooms/RoomCard';
import { Skeleton } from '../ui/Skeleton';
import { NoRoomsPlaceholder } from '../ui/NoRoomsPlaceholder';
import RoomDetailsPage from '../rooms/RoomDetailsPage';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchRooms } from '../utils/fetchUserProfile';

const accommodationTypes = ['Flat','PG',  'Hostel'];
const genders = ['All', 'Male', 'Female', 'Other'];

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState('Flat');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedRoom, setSelectedRoom] = useState(null);
const gridRef = useRef(null);

  const fetchApprovedRooms = async () => {
  setLoading(true);
  try {
    const userId = sessionStorage.getItem('userId');
    let url = `https://roomradarbackend.onrender.com/api/rooms/approved?accommodationType=${selectedAccommodation}`;

    // Add userId only if user is logged in
    if (userId) {
      url += `&userId=${userId}`;
    }

    const data = await fetchRooms(url);
    setRooms(data);
  } catch (error) {
    console.error('Error fetching approved rooms:', error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchApprovedRooms();
}, [selectedAccommodation]);



  const filteredRooms = rooms.filter((room) =>
    selectedGender === 'All' ? true : room.preferredGender === selectedGender
  );

  const renderSkeletonCards = () => {
    const skeletonArray = new Array(4).fill(null);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {skeletonArray.map((_, index) => (
          <div key={index} className="p-4 border rounded-md shadow bg-white">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  };
window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 h-[calc(100vh-5rem)] overflow-y-auto pb-20">


      {/* Tabs + Search */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
  {/* Accommodation Tabs */}
  <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
    {accommodationTypes.map((type) => (
      <button
        key={type}
        onClick={() => setSelectedAccommodation(type)}
        className={`transition-all duration-200 whitespace-nowrap rounded-full px-5 py-2 font-semibold text-sm border ${
          selectedAccommodation === type
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50 hover:border-blue-500'
        }`}
      >
        {type}
      </button>
    ))}
  </div>

  {/* Search Input */}
  <div className="w-full sm:w-64 relative">
    <input
      type="text"
      placeholder="Search by area, landmark..."
      className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
      onChange={(e) => {
        const value = e.target.value.toLowerCase();
        const filtered = rooms.filter(
          (room) =>
            room.location?.toLowerCase().includes(value) ||
            room.city?.toLowerCase().includes(value)
        );
        setRooms(filtered.length ? filtered : []);
      }}
    />
    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">🔍</span>
  </div>
</div>


      {/* Room Cards or Loader */}
      {loading ? (
        renderSkeletonCards()
      ) : filteredRooms.length === 0 ? (
        <NoRoomsPlaceholder message="No rooms available for selected filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {filteredRooms.map((room) => (
            <React.Fragment key={room.id}>
              <RoomCard
                room={room}
                onViewDetails={() => setSelectedRoom(room)}
                activeTab="All Listings"
              />

              {/* Room Details Expand */}
              <AnimatePresence>
                {selectedRoom?.id === room.id && (
                  <motion.div
                    className="md:col-span-2 w-full relative"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full shadow hover:bg-gray-500 z-50"
                    >
                      ✕
                    </button>
                    <RoomDetailsPage
                      roomId={room.id}
                      onClose={() => setSelectedRoom(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;