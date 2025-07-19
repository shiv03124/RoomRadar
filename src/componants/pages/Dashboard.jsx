// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiFilter, FiMenu, FiX
// } from 'react-icons/fi';
// import RoomCard from '../rooms/RoomCard';
// import AddRoomModal from '../rooms/AddRoomModal';
// import ApplicationsModal from '../applications/ApplicationsModal';
// import EditRoomModal from '../rooms/EditRoomModal';
// import { fetchUserProfile, fetchRooms } from '../utils/fetchUserProfile';
// import SearchFilters from '../rooms/SearchFilters';
// import RoomDetailsPage from '../rooms/RoomDetailsPage';
// import { Skeleton } from '../ui/Skeleton'; // adjust the path as per your project
// import { NoRoomsPlaceholder } from '../ui/NoRoomsPlaceholder';


// // Default filters constant
// const defaultFilters = {
//   city: '',
//   area: '',
//   minVacancies: 1,
//   maxVacancies: 5,
//   minRent: 0,
//   maxRent: 10000,
//   preferredGender: '',
//   amenities: []
// };

// const Dashboard = () => {
//   const [showRoomDetails, setShowRoomDetails] = useState(false);
//   const [showApplicationsModal, setShowApplicationsModal] = useState(false);
//   const [showEditRoomModal, setShowEditRoomModal] = useState(false);
//   const [showAddRoomModal, setShowAddRoomModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [editingRoom, setEditingRoom] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [appliedRooms, setAppliedRooms] = useState([]);
//   const [roomApplications, setRoomApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);

//   const [activeTab, setActiveTab] = useState('All Listings');
//   const [filters, setFilters] = useState(defaultFilters);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedRoomId, setExpandedRoomId] = useState(null);
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//   const renderSkeletonCards = () => {
//   const skeletonArray = new Array(4).fill(null); // render 4 skeletons as placeholder
//   return (
//     <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {skeletonArray.map((_, index) => (
//         <div key={index} className="w-full">
//           <div className="p-4 border rounded-md shadow bg-white">
//             <Skeleton className="h-48 w-full mb-4" />
//             <Skeleton className="h-5 w-3/4 mb-2" />
//             <Skeleton className="h-4 w-1/2 mb-2" />
//             <Skeleton className="h-4 w-2/3 mb-2" />
//             <div className="flex gap-2 mt-3">
//               <Skeleton className="h-8 w-20" />
//               <Skeleton className="h-8 w-20" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


//   useEffect(() => {
//     const loadDefaultRooms = async () => {
//       const token = sessionStorage.getItem('token');
//       try {
//         setLoading(true);
//         if (!token) {
//           const data = await fetchRooms('http://localhost:8080/api/rooms/', null);
//           setRooms(data);
//           setUserData(null);
//         } else {
//           const user = await fetchUserProfile();
//           if (!user?.id) throw new Error('User ID not available');
//           sessionStorage.setItem('userId', user.id);
//           setUserData(user);
//           const data = await fetchRooms(`http://localhost:8080/api/rooms/not-applied/${user.id}`, token);
//           setRooms(data);
//         }
//       } catch (err) {
//         setError(err.message);
//         sessionStorage.clear();
//         setUserData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDefaultRooms();
//   }, []);

//   useEffect(() => {
//     const fetchTabData = async () => {
//       const token = sessionStorage.getItem('token');
//       if (activeTab !== 'All Listings' && !userData?.id) return;

//       try {
//         setLoading(true);
//         if (activeTab === 'My Listings') {
//           const data = await fetchRooms(`http://localhost:8080/api/rooms/user/${userData.id}`, token);
//           setRooms(data);
//         } else if (activeTab === 'Applied Rooms') {
//           const data = await fetchRooms(`http://localhost:8080/api/rooms/applied/${userData.id}`, token);
//           setAppliedRooms(data);
//         } else if (activeTab === 'All Listings') {
//           if (!token) {
//             const data = await fetchRooms('http://localhost:8080/api/rooms/', null);
//             setRooms(data);
//           } else {
//             const data = await fetchRooms(`http://localhost:8080/api/rooms/not-applied/${userData.id}`, token);
//             setRooms(data);
//           }
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTabData();
//   }, [activeTab, userData]);


//   const handleViewDetails = (room) => {
//     setSelectedRoom(room);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     const numericFields = ['minRent', 'maxRent', 'minVacancies', 'maxVacancies'];
//     const newValue = numericFields.includes(name) ? Number(value) : value;
//     setFilters(prev => ({ ...prev, [name]: newValue }));
//   };

//   const handleResetFilters = () => {
//     setFilters(defaultFilters);
//   };

//   const handleSearchSubmit = async () => {
//     if (activeTab !== 'All Listings') return;

//     const userId = sessionStorage.getItem('userId');
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();

//       if (filters.city) params.append('city', filters.city);
//       if (filters.area) params.append('area', filters.area);
//       if (filters.minVacancies !== undefined) params.append('minVacancies', filters.minVacancies.toString());
//       if (filters.maxVacancies !== undefined) params.append('maxVacancies', filters.maxVacancies.toString());
//       if (filters.minRent !== undefined) params.append('minRent', filters.minRent.toString());
//       if (filters.maxRent !== undefined) params.append('maxRent', filters.maxRent.toString());
//       if (filters.preferredGender) params.append('preferredGender', filters.preferredGender);
//       if (userId && !isNaN(userId)) params.append('userId', userId);
//       filters.amenities.forEach(a => params.append('amenities', a));

//       const data = await fetchRooms(`http://localhost:8080/api/rooms/search?${params.toString()}`);
//       setRooms(data);
//       setIsSearching(false);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFetchApplications = (applications) => {
//     setRoomApplications(applications);
//     setShowApplicationsModal(true);
//   };

//   const handleToggleDetails = (roomId) => {
//     setExpandedRoomId(prevId => (prevId === roomId ? null : roomId));
//   };

//   useEffect(() => {
//     if (mobileFilterOpen) setShowFilters(false);
//   }, [mobileFilterOpen]);

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 overflow-x-hidden" style={{ height: '80vh', overflowY: 'auto' }}>
//       {/* Tabs and Mobile Filter Toggle */}
// <div className="w-full mt-5 pb-2">
//   {/* Mobile View */}
//   <div className="sm:hidden">
//     <div className="flex flex-wrap items-center gap-2">
//       {/* Always show All Listings */}
//       <button
//         onClick={() => setActiveTab('All Listings')}
//         className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
//           activeTab === 'All Listings'
//             ? 'bg-indigo-600 text-white shadow-md'
//             : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
//         }`}
//       >
//         All Listings
//       </button>

//       {/* Conditional My Listings tab */}
//       {sessionStorage.getItem('token') && (
//         <button
//           onClick={() => setActiveTab('My Listings')}
//           className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
//             activeTab === 'My Listings'
//               ? 'bg-indigo-600 text-white shadow-md'
//               : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
//           }`}
//         >
//           My Listings
//         </button>
//       )}

//       {/* Conditional Applied Rooms with hamburger button */}
//       {sessionStorage.getItem('token') ? (
//   <div className="flex items-center gap-2">
//     <button
//       onClick={() => setActiveTab('Applied Rooms')}
//       className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
//         activeTab === 'Applied Rooms'
//           ? 'bg-indigo-600 text-white shadow-md'
//           : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
//       }`}
//     >
//           Applied Rooms
//     </button>
//     {/* Only show hamburger when in All Listings tab */}
//     {activeTab === 'All Listings' && (
//       <button
//         onClick={() => setMobileFilterOpen(prev => !prev)}
//         className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
//       >
//         {mobileFilterOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>)}
//         </div>
//       ) : (
//         activeTab === 'All Listings' && (
//     <button
//       onClick={() => setMobileFilterOpen(prev => !prev)}
//       className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
//     >
//       {mobileFilterOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//     </button>)
//       )}
//     </div>
//   </div>

//   {/* Desktop View (unchanged) */}
//  <div className="hidden sm:flex flex-wrap sm:items-center sm:justify-between mt-3">
//   <div className="flex gap-2">
//     {['All Listings', ...(sessionStorage.getItem('token') ? ['My Listings', 'Applied Rooms'] : [])].map((tab) => (
//       <button
//         key={tab}
//         onClick={() => setActiveTab(tab)}
//         className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
//           activeTab === tab
//             ? 'bg-indigo-600 text-white shadow-md'
//             : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
//         }`}
//       >
//         {tab}
//       </button>
//     ))}
//   </div>

//   {/* Only show filter button in All Listings tab */}
//   {activeTab === 'All Listings' && (
//     <button
//       onClick={() => setShowFilters(true)}
//       className="flex items-center px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md"
//     >
//       <FiFilter className="mr-2" />
//       Filters
//     </button>
//   )}
// </div>
// </div>

//       {/* Mobile Filter Panel */}
//       <AnimatePresence>
//         {mobileFilterOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="sm:hidden border border-gray-300 rounded-md p-4 bg-white shadow mb-4"
//           >
//             <SearchFilters
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               onSubmit={() => {
//                 handleSearchSubmit();
//                 setMobileFilterOpen(false);
//               }}
//               onReset={handleResetFilters}
//               activeTab="All Listings"
//               isLoading={isSearching}
//               onClose={() => setMobileFilterOpen(false)}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Desktop Filter Modal */}
//       {showFilters && (
//         <SearchFilters
//           filters={filters}
//           onFilterChange={handleFilterChange}
//           onSubmit={handleSearchSubmit}
//           onReset={handleResetFilters}
//           activeTab="All Listings"
//           isLoading={isSearching}
//           onClose={() => setShowFilters(false)}
//         />
//       )}

//       {/* Room Cards */}
//       {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {(activeTab === 'Applied Rooms' ? appliedRooms : rooms).map((room) => (
//           <React.Fragment key={room.id}>
//             <div className="w-full">
//               <RoomCard
//                 room={room}
//                 activeTab={activeTab}
//                 onFetchApplications={handleFetchApplications}
//                 isAppliedView={activeTab === 'Applied Rooms'}
//                 onToggleDetails={handleToggleDetails}
//                 isExpanded={expandedRoomId === room.id}
//                 onViewDetails={() => handleViewDetails(room)}
//               />
//             </div>

//             <AnimatePresence>
//               {selectedRoom && selectedRoom.id === room.id && (
//                 <motion.div
//                   className="md:col-span-2 w-full"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ 
//                     opacity: 1, 
//                     height: 'auto',
//                     transition: { 
//                       opacity: { duration: 0.3 },
//                       height: { duration: 0.4 } 
//                     }
//                   }}
//                   exit={{ 
//                     opacity: 0, 
//                     height: 0,
//                     transition: { 
//                       opacity: { duration: 0.2 },
//                       height: { duration: 0.3 } 
//                     }
//                   }}
//                   layout
//                 >
//                   <RoomDetailsPage roomId={room.id} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </React.Fragment>
//         ))}
//       </div> */}
//       {loading ? (
//   renderSkeletonCards()
// ) : (
//   <>
//     {(activeTab === 'Applied Rooms' ? appliedRooms : rooms).length === 0 ? (
//       <NoRoomsPlaceholder
//         message={
//           activeTab === 'Applied Rooms'
//             ? "You haven't applied to any rooms yet."
//             : activeTab === 'My Listings'
//             ? "You haven't posted any rooms yet."
//             : "No rooms found. Try adjusting your filters."
//         }
//       />
//     ) : (
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {(activeTab === 'Applied Rooms' ? appliedRooms : rooms).map((room) => (
//           <React.Fragment key={room.id}>
//             <div className="w-full">
//               <RoomCard
//                 room={room}
//                 activeTab={activeTab}
//                 onFetchApplications={handleFetchApplications}
//                 isAppliedView={activeTab === 'Applied Rooms'}
//                 onToggleDetails={handleToggleDetails}
//                 isExpanded={expandedRoomId === room.id}
//                 onViewDetails={() => handleViewDetails(room)}
//               />
//             </div>

//             <AnimatePresence>
//               {selectedRoom && selectedRoom.id === room.id && (
//                 <motion.div
//                   className="md:col-span-2 w-full"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ 
//                     opacity: 1, 
//                     height: 'auto',
//                     transition: { 
//                       opacity: { duration: 0.3 },
//                       height: { duration: 0.4 } 
//                     }
//                   }}
//                   exit={{ 
//                     opacity: 0, 
//                     height: 0,
//                     transition: { 
//                       opacity: { duration: 0.2 },
//                       height: { duration: 0.3 } 
//                     }
//                   }}
//                   layout
//                 >
//                   <RoomDetailsPage roomId={room.id} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </React.Fragment>
//         ))}
//       </div>
//     )}
//   </>
// )}



//       {/* Modals */}
//       <AnimatePresence>
//         {showApplicationsModal && (
//           <ApplicationsModal
//             applications={roomApplications}
//             onClose={() => setShowApplicationsModal(false)}
//           />
//         )}
//         {showEditRoomModal && editingRoom && (
//           <EditRoomModal
//             room={editingRoom}
//             onClose={() => setShowEditRoomModal(false)}
//             onRoomUpdated={() => setShowEditRoomModal(false)}
//           />
//         )}
//         {showAddRoomModal && (
//           <AddRoomModal onClose={() => setShowAddRoomModal(false)} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiMenu, FiX } from 'react-icons/fi';
import RoomCard from '../rooms/RoomCard';
import AddRoomModal from '../rooms/AddRoomModal';
import ApplicationsModal from '../applications/ApplicationsModal';
import EditRoomModal from '../rooms/EditRoomModal';
import { fetchUserProfile, fetchRooms } from '../utils/fetchUserProfile';
import SearchFilters from '../rooms/SearchFilters';
import RoomDetailsPage from '../rooms/RoomDetailsPage';
import { Skeleton } from '../ui/Skeleton';
import { NoRoomsPlaceholder } from '../ui/NoRoomsPlaceholder';

const defaultFilters = {
  city: '',
  area: '',
  minVacancies: 1,
  maxVacancies: 5,
  minRent: 0,
  maxRent: 10000,
  preferredGender: '',
  amenities: []
};

const Dashboard = () => {
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [appliedRooms, setAppliedRooms] = useState([]);
  const [roomApplications, setRoomApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const [activeTab, setActiveTab] = useState('All Listings');
  const [filters, setFilters] = useState(defaultFilters);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const renderSkeletonCards = () => {
    const skeletonArray = new Array(4).fill(null);
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {skeletonArray.map((_, index) => (
          <div key={index} className="w-full">
            <div className="p-4 border rounded-md shadow bg-white">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const loadDefaultRooms = async () => {
      const token = sessionStorage.getItem('token');
      try {
        setLoading(true);
        if (!token) {
          const data = await fetchRooms('http://localhost:8080/api/rooms/', null);
          setRooms(data);
          setUserData(null);
        } else {
          const user = await fetchUserProfile();
          if (!user?.id) throw new Error('User ID not available');
          sessionStorage.setItem('userId', user.id);
          setUserData(user);
          const data = await fetchRooms(`http://localhost:8080/api/rooms/not-applied/${user.id}`, token);
          setRooms(data);
        }
      } catch (err) {
        setError(err.message);
        sessionStorage.clear();
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultRooms();
  }, []);

  useEffect(() => {
    const fetchTabData = async () => {
      const token = sessionStorage.getItem('token');
      if (activeTab !== 'All Listings' && !userData?.id) return;

      try {
        setLoading(true);
        if (activeTab === 'My Listings') {
          const data = await fetchRooms(`http://localhost:8080/api/rooms/user/${userData.id}`, token);
          setRooms(data);
        } else if (activeTab === 'Applied Rooms') {
          const data = await fetchRooms(`http://localhost:8080/api/rooms/applied/${userData.id}`, token);
          setAppliedRooms(data);
        } else {
          if (!token) {
            const data = await fetchRooms('http://localhost:8080/api/rooms/', null);
            setRooms(data);
          } else {
            const data = await fetchRooms(`http://localhost:8080/api/rooms/not-applied/${userData.id}`, token);
            setRooms(data);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [activeTab, userData]);

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['minRent', 'maxRent', 'minVacancies', 'maxVacancies'];
    const newValue = numericFields.includes(name) ? Number(value) : value;
    setFilters(prev => ({ ...prev, [name]: newValue }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleSearchSubmit = async () => {
    if (activeTab !== 'All Listings') return;

    const userId = sessionStorage.getItem('userId');
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.city) params.append('city', filters.city);
      if (filters.area) params.append('area', filters.area);
      if (filters.minVacancies !== undefined) params.append('minVacancies', filters.minVacancies.toString());
      if (filters.maxVacancies !== undefined) params.append('maxVacancies', filters.maxVacancies.toString());
      if (filters.minRent !== undefined) params.append('minRent', filters.minRent.toString());
      if (filters.maxRent !== undefined) params.append('maxRent', filters.maxRent.toString());
      if (filters.preferredGender) params.append('preferredGender', filters.preferredGender);
      if (userId && !isNaN(userId)) params.append('userId', userId);
      filters.amenities.forEach(a => params.append('amenities', a));

      const data = await fetchRooms(`http://localhost:8080/api/rooms/search?${params.toString()}`);
      setRooms(data);
      setIsSearching(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchApplications = (applications) => {
    setRoomApplications(applications);
    setShowApplicationsModal(true);
  };

  const handleToggleDetails = (roomId) => {
    setExpandedRoomId(prevId => (prevId === roomId ? null : roomId));
  };

  useEffect(() => {
    if (mobileFilterOpen) setShowFilters(false);
  }, [mobileFilterOpen]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 overflow-x-hidden" style={{ height: '80vh', overflowY: 'auto' }}>
      {/* Tabs */}
      <div className="w-full mt-5 pb-2">
        {/* Mobile View */}
        <div className="sm:hidden">
          <div className="flex flex-col items-start gap-2">
            {/* All Listings with Hamburger */}
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setActiveTab('All Listings')}
                className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
                  activeTab === 'All Listings'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All Listings
              </button>
              <button
                onClick={() => setMobileFilterOpen(prev => !prev)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                {mobileFilterOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>

            {sessionStorage.getItem('token') && (
              <button
                onClick={() => setActiveTab('My Listings')}
                className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
                  activeTab === 'My Listings'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                My Listings
              </button>
            )}

            {sessionStorage.getItem('token') && (
              <button
                onClick={() => setActiveTab('Applied Rooms')}
                className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
                  activeTab === 'Applied Rooms'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Applied Rooms
              </button>
            )}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex flex-wrap sm:items-center sm:justify-between mt-3">
          <div className="flex gap-2">
            {['All Listings', ...(sessionStorage.getItem('token') ? ['My Listings', 'Applied Rooms'] : [])].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full py-1 px-4 text-sm font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'All Listings' && (
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden border border-gray-300 rounded-md p-4 bg-white shadow mb-4"
          >
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onSubmit={() => {
                handleSearchSubmit();
                setMobileFilterOpen(false);
              }}
              onReset={handleResetFilters}
              activeTab="All Listings"
              isLoading={isSearching}
              onClose={() => setMobileFilterOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Filter Modal */}
      {showFilters && (
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
          onReset={handleResetFilters}
          activeTab="All Listings"
          isLoading={isSearching}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Room Cards */}
      {loading ? (
        renderSkeletonCards()
      ) : (
        <>
          {(activeTab === 'Applied Rooms' ? appliedRooms : rooms).length === 0 ? (
            <NoRoomsPlaceholder
              message={
                activeTab === 'Applied Rooms'
                  ? "You haven't applied to any rooms yet."
                  : activeTab === 'My Listings'
                  ? "You haven't posted any rooms yet."
                  : "No rooms found. Try adjusting your filters."
              }
            />
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {(activeTab === 'Applied Rooms' ? appliedRooms : rooms).map((room) => (
                <React.Fragment key={room.id}>
                  <div className="w-full">
                    <RoomCard
                      room={room}
                      activeTab={activeTab}
                      onFetchApplications={handleFetchApplications}
                      isAppliedView={activeTab === 'Applied Rooms'}
                      onToggleDetails={handleToggleDetails}
                      isExpanded={expandedRoomId === room.id}
                      onViewDetails={() => handleViewDetails(room)}
                    />
                  </div>

                  <AnimatePresence>
                    {selectedRoom && selectedRoom.id === room.id && (
                      <motion.div
                        className="md:col-span-2 w-full"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: {
                            opacity: { duration: 0.3 },
                            height: { duration: 0.4 }
                          }
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            opacity: { duration: 0.2 },
                            height: { duration: 0.3 }
                          }
                        }}
                        layout
                      >
                        <RoomDetailsPage roomId={room.id} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showApplicationsModal && (
          <ApplicationsModal
            applications={roomApplications}
            onClose={() => setShowApplicationsModal(false)}
          />
        )}
        {showEditRoomModal && editingRoom && (
          <EditRoomModal
            room={editingRoom}
            onClose={() => setShowEditRoomModal(false)}
            onRoomUpdated={() => setShowEditRoomModal(false)}
          />
        )}
        {showAddRoomModal && (
          <AddRoomModal onClose={() => setShowAddRoomModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

