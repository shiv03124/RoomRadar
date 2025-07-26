import React, { useEffect, useState } from 'react';
import RoomCard from '../rooms/RoomCard';
import { fetchRooms, fetchUserProfile, fetchRoomApplications } from '../utils/fetchUserProfile';
import { Skeleton } from '../ui/Skeleton';
import { NoRoomsPlaceholder } from '../ui/NoRoomsPlaceholder';
import { useParams } from 'react-router-dom';
import ApplicationsModal from '../applications/ApplicationsModal';

const ListingsPage = () => {
  const { type } = useParams(); // 'all', 'My Listings', 'applied'
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [applications, setApplications] = useState([]);

 const loadRooms = async () => {
  setLoading(true);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId'); // assuming you store userId here
  setUserData(null); // reset userData at start or remove if not needed

  try {
    if (token && userId) {
      // Optionally fetch user profile if needed elsewhere
      const user = await fetchUserProfile();
      setUserData(user);
    }

    let endpoint = 'https://roomradarbackend.onrender.com/api/rooms/';

    if (type === 'My Listings' && userId) {
      endpoint += `user/${userId}`;
    } else if (type === 'applied' && userId) {
      endpoint += `applied/${userId}`;
    } else if (type === 'all' && userId) {
      endpoint += `not-applied/${userId}`;
    }

    const data = await fetchRooms(endpoint, token);
    setRooms(data);
  } catch (err) {
    console.error('Error loading rooms:', err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadRooms();
    setExpandedRoomId(null); // reset details view on tab switch
  }, [type]);

  const handleViewDetails = (roomId) => {
    setExpandedRoomId(prevId => (prevId === roomId ? null : roomId));
  };

  const handleFetchApplications = (applications) => {
    setApplications(applications);
    setShowApplicationsModal(true);
  };

  return (
    <div className="h-[calc(100vh-5rem)] overflow-y-auto max-w-7xl pb-20 mx-auto px-4 py-4 sm:py-6">
      
      <div className="h-full overflow-y-auto pb-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <NoRoomsPlaceholder
              message={
                type === 'My Listings'
                  ? "You haven't posted any rooms yet."
                  : type === 'applied'
                  ? "You haven't applied to any rooms yet."
                  : "No rooms available. Try again later."
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {rooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                activeTab={type}
                onViewDetails={(e) => handleViewDetails(room.id)}
                onToggleDetails={() => {}}
                isAppliedView={type === 'applied'}
                isExpanded={expandedRoomId === room.id}
                onCloseDetails={() => setExpandedRoomId(null)}
                onFetchApplications={handleFetchApplications}
              />
            ))}
          </div>
        )}
      </div>

      {/* Applications Modal */}
      {showApplicationsModal && (
        <ApplicationsModal
          applications={applications}
          onClose={() => {
            setShowApplicationsModal(false);
            setApplications([]);
          }}
        />
      )}
    </div>
  );
};

export default ListingsPage;