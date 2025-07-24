// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getRoomById, deleteRoom } from '../utils/fetchUserProfile';
// import toast from 'react-hot-toast';
// import EditRoomModal from './EditRoomModal';
// import { SuccessToast, ErrorToast } from '../Toster/ToastMessages';
// import { 
//   FiWifi, 
//   FiAirplay, 
//   FiWatch, 
//   FiHome, 
//   FiMapPin, 
//   FiDroplet,
//   FiCheckCircle
// } from 'react-icons/fi';
// import { MdMicrowave } from 'react-icons/md';
// import { IoMdClose } from 'react-icons/io';
// import { BsCheckCircle } from 'react-icons/bs';

// const RoomDetailsPage = ({ roomId, isInline = false,onClose }) => {
//   const navigate = useNavigate();
// const availableAmenities = [
//   { name: 'Wi-Fi', icon: <FiWifi className="text-blue-500" size={18} /> },
//   { name: 'Air Conditioning', icon: <FiAirplay className="text-blue-400" size={18} /> },
//   { name: 'Washing Machine', icon: <FiWatch className="text-indigo-500" size={18} /> },
//   { name: 'Refrigerator', icon: <MdMicrowave className="text-green-500" size={18} /> },
//   { name: 'TV', icon: <FiHome className="text-red-500" size={18} /> },
//   { name: 'Microwave', icon: <MdMicrowave className="text-orange-500" size={18} /> },
//   { name: 'Furniture', icon: <FiHome className="text-amber-500" size={18} /> },
//   { name: 'Parking', icon: <FiMapPin className="text-gray-600" size={18} /> },
//   { name: 'Gym', icon: <FiDroplet className="text-purple-500" size={18} /> },
//   { name: 'Swimming Pool', icon: <FiDroplet className="text-blue-300" size={18} /> },
// ];

//   const [room, setRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const roomData = await getRoomById(roomId);
//         setRoom(roomData);
//       } catch (error) {
//         console.error("Error loading room data:", error);
//         toast.custom((t) => <ErrorToast message="Failed to load room details." t={t} />);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [roomId]);

//   const nextImage = () => {
//     if (!room?.images?.length) return;
//     setCurrentImageIndex((prev) =>
//       prev === room.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     if (!room?.images?.length) return;
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? room.images.length - 1 : prev - 1
//     );
//   };

//   const handleDeleteClick = () => {
//     setShowConfirmDelete(true);
//   };

//   const handleConfirmDelete = async () => {
//     setShowConfirmDelete(false);
//     const loadingToastId = toast.loading("Deleting room...");
//     try {
//       await deleteRoom(room.id);
//       toast.dismiss(loadingToastId);
//       toast.success("Room deleted successfully!");
//       navigate('/dashboard');
//     } catch (error) {
//       toast.dismiss(loadingToastId);
//       toast.error("Failed to delete room: " + (error.message || ""));
//       console.error("Room deletion failed:", error);
//     }
//   };

//   const handleEditClick = () => {
//     setShowEditModal(true);
//   };

//   const handleRoomUpdated = (updatedRoom) => {
//     setRoom(updatedRoom);
//     setShowEditModal(false);
//   };

//   const loggedInUserId = sessionStorage.getItem('userId');
//   const isRoomOwner = loggedInUserId && loggedInUserId === String(room?.user?.id);

//   useEffect(() => {
//     if (!loading) {
//       const rafId = requestAnimationFrame(() => {
//         if (elementRef.current) {
//           elementRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//       });
//       return () => cancelAnimationFrame(rafId);
//     }
//   }, [roomId, loading]);

//   if (loading) return (
//     <div className="flex justify-center items-center py-10">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

// const roomAmenities = room?.amenities || [];
//   const isAmenityAvailable = (name) => roomAmenities.includes(name);
//   return (
//     <div ref={elementRef} className={`${isInline ? 'w-full' : 'bg-gray-100 min-h-screen pb-10'}`}>
//            <div className={`${isInline ? 'w-full' : 'container mx-auto px-4 sm:px-6 py-5'}`}>
//         <div className="flex flex-col gap-4 lg:gap-6">
//           {/* Room Details */}
//           <div className={`${isInline ? 'w-full' : 'w-full'}`}>
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               {/* Image Gallery */}
//               {room.images?.length > 0 && (
//                 <div className="relative h-48 sm:h-64 md:h-80 w-full">
//                   <img
//                     src={room.images[currentImageIndex]}
//                     alt={`Room ${currentImageIndex + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                   {room.images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full shadow hover:bg-white"
//                       >
//                         <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full shadow hover:bg-white"
//                       >
//                         <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
//                     </>
//                   )}
//                   <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
//                     {currentImageIndex + 1} / {room.images.length}
//                   </div>
//                 </div>
//               )}

//               {/* Room Info */}
//               <div className="p-4 sm:p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{room.title}</h1>
//                     <div className="flex items-center mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm">
//                       <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       <span>{room.address}, {room.city}, {room.area}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price and Basic Info */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 bg-gray-50 p-2 sm:p-3 rounded-lg">
//                   <div>
//                     <p className="text-xs text-gray-500">Monthly Rent</p>
//                     <p className="font-bold text-sm sm:text-base text-blue-600">₹{room.rent?.toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Total No Of People</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.totalNoOfPeoples}</p>
//                   </div>
//                    <div>
//                     <p className="text-xs text-gray-500">Total No Of vacancies</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.noofvacancies}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Furnished</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.furnished}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Preferred Gender</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.preferredGender}</p>
//                   </div>
//                   <div> 
//                     <p className="text-xs text-gray-500">Security Deposite</p>
//                     <p className="font-bold text-sm sm:text-base text-blue-600">₹{room.securityDeposit?.toLocaleString()}</p>
//                   </div>
//                   <div> 
//                     <p className="text-xs text-gray-500">Accommodation Type</p>
//                     <p className="font-bold text-sm sm:text-base text-blue-600">{room.accommodationType}</p>
//                   </div>
//                   <div> 
//                     <p className="text-xs text-gray-500">Available From</p>
//                     <p className="font-bold text-sm sm:text-base text-blue-600">{new Date(room.availableFrom).toLocaleDateString()}</p>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="mb-4 sm:mb-6">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Description</h2>
//                   <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">{room.description || 'No description provided.'}</p>
//                 </div>

//                 {/* Amenities */}
//                 <div className="mb-4 sm:mb-6">
//           <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Amenities</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
//             {availableAmenities.map((amenity, idx) => {
//               const available = isAmenityAvailable(amenity.name);
//               return (
//                 <div
//                   key={idx}
//                   className={`flex items-center p-2 rounded-lg border ${
//                     available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
//                   }`}
//                 >
//                   <div className="mr-2">{amenity.icon}</div>
//                   <span className={`text-sm ${available ? 'text-gray-800' : 'text-gray-400 '}`}>
//                     {amenity.name}
//                   </span>
//                   <div className="ml-auto">
//                     {available ? (
//                       <BsCheckCircle className="text-green-500" size={16} />
//                     ) : (
//                       <IoMdClose className="text-gray-400" size={16} />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>


//                 {/* Action Buttons */}
//                 {isRoomOwner && (
//                   <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
//                     <button
//                       onClick={handleEditClick}
//                       className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md text-xs sm:text-sm"
//                     >
//                       Edit Listing
//                     </button>
//                     <button
//                       onClick={handleDeleteClick}
//                       className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md text-xs sm:text-sm"
//                     >
//                       Delete Listing
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Room Modal */}
//       {showEditModal && (
//         <EditRoomModal
//           room={room}
//           onClose={() => setShowEditModal(false)}
//           onRoomUpdated={handleRoomUpdated}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {showConfirmDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-5">
//             <div className="flex justify-between items-start mb-3 sm:mb-4">
//               <h3 className="text-base sm:text-lg font-bold text-gray-800">Confirm Deletion</h3>
//               <button
//                 onClick={() => setShowConfirmDelete(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">Are you sure you want to permanently delete this room listing? This action cannot be undone.</p>
//             <div className="flex justify-end space-x-2 sm:space-x-3">
//               <button
//                 onClick={() => setShowConfirmDelete(false)}
//                 className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-xs sm:text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmDelete}
//                 className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center text-xs sm:text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomDetailsPage;
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoomById, deleteRoom } from '../utils/fetchUserProfile';
import toast from 'react-hot-toast';
import EditRoomModal from './EditRoomModal';
import { SuccessToast, ErrorToast } from '../Toster/ToastMessages';
import { 
  FiWifi, 
  FiAirplay, 
  FiWatch, 
  FiHome, 
  FiMapPin, 
  FiDroplet,
  FiX
} from 'react-icons/fi';
import { MdMicrowave } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

const RoomDetailsPage = ({ roomId, isInline = false, onClose }) => {
  const navigate = useNavigate();
  const availableAmenities = [
    { name: 'Wi-Fi', icon: <FiWifi className="text-blue-500" size={18} /> },
    { name: 'Air Conditioning', icon: <FiAirplay className="text-blue-400" size={18} /> },
    { name: 'Washing Machine', icon: <FiWatch className="text-indigo-500" size={18} /> },
    { name: 'Refrigerator', icon: <MdMicrowave className="text-green-500" size={18} /> },
    { name: 'TV', icon: <FiHome className="text-red-500" size={18} /> },
    { name: 'Microwave', icon: <MdMicrowave className="text-orange-500" size={18} /> },
    { name: 'Furniture', icon: <FiHome className="text-amber-500" size={18} /> },
    { name: 'Parking', icon: <FiMapPin className="text-gray-600" size={18} /> },
    { name: 'Gym', icon: <FiDroplet className="text-purple-500" size={18} /> },
    { name: 'Swimming Pool', icon: <FiDroplet className="text-blue-300" size={18} /> },
  ];

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
      } catch (error) {
        console.error("Error loading room data:", error);
        toast.custom((t) => <ErrorToast message="Failed to load room details." t={t} />);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  const nextImage = () => {
    if (!room?.images?.length) return;
    setCurrentImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!room?.images?.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDelete(false);
    const loadingToastId = toast.loading("Deleting room...");
    try {
      await deleteRoom(room.id);
      toast.dismiss(loadingToastId);
      toast.success("Room deleted successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Failed to delete room: " + (error.message || ""));
      console.error("Room deletion failed:", error);
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleRoomUpdated = (updatedRoom) => {
    setRoom(updatedRoom);
    setShowEditModal(false);
  };

  const loggedInUserId = sessionStorage.getItem('userId');
  const isRoomOwner = loggedInUserId && loggedInUserId === String(room?.user?.id);

  useEffect(() => {
    if (!loading) {
      const rafId = requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [roomId, loading]);

  if (loading) return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const roomAmenities = room?.amenities || [];
  const isAmenityAvailable = (name) => roomAmenities.includes(name);

  return (
    <div ref={elementRef} className={`${isInline ? 'w-full' : 'bg-gray-100 min-h-screen pb-10'}`}>
     

      <div className={`${isInline ? 'w-full' : 'container mx-auto px-4 sm:px-6 py-5'}`}>
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Room Details */}
          <div className={`${isInline ? 'w-full' : 'w-full'}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Image Gallery */}
              {room.images?.length > 0 && (
                <div className="relative h-48 sm:h-64 md:h-80 w-full">
                  <img
                    src={room.images[currentImageIndex]}
                    alt={`Room ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {room.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full shadow hover:bg-white"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full shadow hover:bg-white"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
                    {currentImageIndex + 1} / {room.images.length}
                  </div>
                </div>
              )}

              {/* Room Info */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{room.title}</h1>
                    <div className="flex items-center mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{room.address}, {room.city}, {room.area}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Basic Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Monthly Rent</p>
                    <p className="font-bold text-sm sm:text-base text-blue-600">₹{room.rent?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total People</p>
                    <p className="font-medium text-xs sm:text-sm">{room.totalNoOfPeoples}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Vacancies</p>
                    <p className="font-medium text-xs sm:text-sm">{room.noofvacancies}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Furnished</p>
                    <p className="font-medium text-xs sm:text-sm">{room.furnished}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Preferred Gender</p>
                    <p className="font-medium text-xs sm:text-sm">{room.preferredGender}</p>
                  </div>
                  <div> 
                    <p className="text-xs text-gray-500">Security Deposit</p>
                    <p className="font-bold text-sm sm:text-base text-blue-600">₹{room.securityDeposit?.toLocaleString()}</p>
                  </div>
                  <div> 
                    <p className="text-xs text-gray-500">Accommodation</p>
                    <p className="font-bold text-sm sm:text-base text-blue-600">{room.accommodationType}</p>
                  </div>
                  <div> 
                    <p className="text-xs text-gray-500">Available From</p>
                    <p className="font-bold text-sm sm:text-base text-blue-600">
                      {new Date(room.availableFrom).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Description</h2>
                  <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">
                    {room.description || 'No description provided.'}
                  </p>
                </div>

                {/* Amenities - Updated for better mobile view */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {availableAmenities.map((amenity, idx) => {
                      const available = isAmenityAvailable(amenity.name);
                      return (
                        <div
                          key={idx}
                          className={`flex items-center p-2 rounded-lg border ${
                            available 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 opacity-70'
                          }`}
                        >
                          <div className="mr-2">{amenity.icon}</div>
                          <span className={`text-xs sm:text-sm ${
                            available ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {amenity.name}
                          </span>
                          <div className="ml-auto">
                            {available ? (
                              <BsCheckCircle className="text-green-500" size={16} />
                            ) : (
                              <span className="text-gray-400 text-xs">N/A</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                {isRoomOwner && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button
                      onClick={handleEditClick}
                      className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md text-sm"
                    >
                      Edit Listing
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md text-sm"
                    >
                      Delete Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Room Modal */}
      {showEditModal && (
        <EditRoomModal
          room={room}
          onClose={() => setShowEditModal(false)}
          onRoomUpdated={handleRoomUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-5">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Confirm Deletion</h3>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
              Are you sure you want to permanently delete this room listing? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;