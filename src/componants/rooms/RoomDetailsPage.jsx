// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getRoomById, deleteRoom, handleApply, fetchRoomApplications, handleApplicationAction } from '../utils/fetchUserProfile';
// import toast from 'react-hot-toast';
// import EditRoomModal from './EditRoomModal';
// import PersonalInfoModal from '../profile/PersonalInfoModal';
// import { SuccessToast, ErrorToast } from '../Toster/ToastMessages';
// import { FiArrowLeft } from 'react-icons/fi';

// const RoomDetailsPage = ({ roomId, isInline = false }) => {
//   const navigate = useNavigate();

//   const [room, setRoom] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [viewProfileData, setViewProfileData] = useState(null);
//   const [showApplications, setShowApplications] = useState(false);
//   const elementRef = useRef(null);


//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const roomData = await getRoomById(roomId);
//         setRoom(roomData);

//         const apps = await fetchRoomApplications(roomId);
//         setApplications(apps);
//       } catch (error) {
//         console.error("Error loading data:", error);
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
// useEffect(() => {
//   if (!loading) {
//     const rafId = requestAnimationFrame(() => {
//       if (elementRef.current) {
//         elementRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//     });
//     return () => cancelAnimationFrame(rafId);
//   }
// }, [roomId, loading]);




//   const prevImage = () => {
//     if (!room?.images?.length) return;
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? room.images.length - 1 : prev - 1
//     );
//   };

//   const applyForRoom = async () => {
//   const result = await handleApply(roomId);
  
//   if (result.success && result.alreadyApplied) {
//     toast('You have already applied for this room.', { icon: '⚠️' });
//   } else if (result.success) {
//     toast.custom((t) => <SuccessToast message="applied send sucessfully." t={t} />);
//     const apps = await fetchRoomApplications(roomId);
//     setApplications(apps);
//   } else {
//     toast.custom((t) => <ErrorToast message="for Sumit application you have to login." t={t} />);
//     navigate('/login')
//   }
// };


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

//   const handleAction = async (applicationId, action) => {
//     const loadingToastId = toast.loading(`Processing ${action.toLowerCase()}...`);

//     try {
//       await handleApplicationAction(applicationId, action);
//       const apps = await fetchRoomApplications(roomId);
//       setApplications(apps);

//       toast.dismiss(loadingToastId);
//       toast.custom((t) => (
//         <SuccessToast message={`Application ${action.toLowerCase()} successfully!`} t={t} />
//       ), {
//         duration: 4000,
//         position: 'top-right',
//       });
//     } catch (err) {
//       console.error("Error processing application action:", err);
//       toast.dismiss(loadingToastId);
//       toast.custom((t) => (
//         <ErrorToast message={`Failed to process application: ${err.message}`} t={t} />
//       ), {
//         duration: 5000,
//         position: 'top-right',
//       });
//     }
//   };

//   const handleViewProfile = (applicant) => {
//     setViewProfileData({
//       fullName: applicant.name,
//       email: applicant.email,
//       phone: applicant.phone,
//       gender: applicant.gender,
//       dateOfBirth: applicant.dateOfBirth,
//       currentCity: applicant.currentCity,
//       address: applicant.address,
//       preferences: applicant.preferences
//     });
//   };

//   const loggedInUserId = sessionStorage.getItem('userId');
//   const isRoomOwner = loggedInUserId && loggedInUserId === String(room?.user?.id);

//   if (loading) return (
//     <div className="flex justify-center items-center py-10">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   return (
//     <div  ref={elementRef}   className={`${isInline ? 'w-full' : 'bg-gray-100 min-h-screen pb-10'}`}>
     
//       <div className={`${isInline ? 'w-full' : 'container mx-auto px-4 sm:px-6 py-5'}`}>
//         <div className={`flex flex-col ${isRoomOwner && applications.length > 0 ? 'lg:flex-row' : ''} gap-4 lg:gap-6`}>
//           {/* Room Details */}
//           <div className={`${isInline ? 'w-full' : isRoomOwner && applications.length > 0 ? 'lg:w-2/3' : 'w-full'}`}>
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
//                     <p className="text-xs text-gray-500">Type</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.configuration}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Furnishing</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.furnished}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Preferred Gender</p>
//                     <p className="font-medium text-xs sm:text-sm">{room.preferredGender}</p>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="mb-4 sm:mb-6">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Description</h2>
//                   <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">{room.description || 'No description provided.'}</p>
//                 </div>

//                 {/* Amenities */}
//                 <div className="mb-4 sm:mb-6">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Amenities</h2>
//                   {room.amenities?.length > 0 ? (
//                     <div className="grid grid-cols-2 gap-1 sm:gap-2">
//                       {room.amenities.map((item, idx) => (
//                         <div key={idx} className="flex items-center">
//                           <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                           <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 text-xs sm:text-sm">No amenities listed</p>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 {isRoomOwner ? (
//                   <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
//                     <button
//                       onClick={handleEditClick}
//                       className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                       Edit Listing
//                     </button>
//                     <button
//                       onClick={handleDeleteClick}
//                       className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                       Delete Listing
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="mt-4 sm:mt-6">
                   
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Applications Section */}
//           {isRoomOwner && applications.length > 0 && !isInline && (
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
//                 <div className="p-4 sm:p-5">
//                   <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Applications ({applications.length})</h2>
                  
//                   <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
//                     {applications.map((app) => (
//                       <div key={app.id} className="border border-gray-200 rounded-lg p-2 sm:p-3 hover:shadow-md transition">
//                         <div className="flex justify-between items-start mb-1 sm:mb-2">
//                           <div>
//                             <p className="text-xs text-gray-500">Applied on: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}</p>
//                             <p className={`text-xs font-medium ${
//                               app.status === 'approved' ? 'text-green-600' :
//                               app.status === 'rejected' ? 'text-red-600' :
//                               'text-yellow-600'
//                             }`}>
//                               Status: {app.status || 'pending'}
//                             </p>
//                           </div>
//                           <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">#{app.id}</span>
//                         </div>
                        
//                         {app.applicant ? (
//                           <div className="mt-1 sm:mt-2">
//                             <div className="flex items-center space-x-2">
//                               {app.applicant.profileImage ? (
//                                 <img
//                                   src={app.applicant.profileImage}
//                                   alt="Applicant"
//                                   className="w-8 h-8 rounded-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                                   <span className="text-blue-500 font-medium text-xs">
//                                     {app.applicant.name?.charAt(0) || 'A'}
//                                   </span>
//                                 </div>
//                               )}
//                               <div>
//                                 <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{app.applicant.name}</h4>
//                                 <p className="text-xs text-gray-600">{app.applicant.email}</p>
//                               </div>
//                             </div>
                            
//                             <div className="mt-1 sm:mt-2 grid grid-cols-2 gap-1 text-xs">
//                               {app.applicant.phone && (
//                                 <a 
//                                   href={`tel:${app.applicant.phone}`}
//                                   className="flex items-center text-blue-600 hover:text-blue-800 truncate"
//                                 >
//                                   <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                   </svg>
//                                   {app.applicant.phone}
//                                 </a>
//                               )}
//                               <div className="flex items-center text-gray-600 truncate">
//                                 <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                                 </svg>
//                                 <span className="truncate">{app.message || 'No message'}</span>
//                               </div>
//                             </div>
                            
//                             <div className="mt-1 sm:mt-2 flex flex-wrap gap-1">
//                               <button 
//                                 onClick={() => handleAction(app.id, 'ACCEPTED')} 
//                                 className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200 transition"
//                               >
//                                 Approve
//                               </button>
//                               <button 
//                                 onClick={() => handleAction(app.id, 'REJECTED')} 
//                                 className="px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded hover:bg-red-200 transition"
//                               >
//                                 Reject
//                               </button>
//                               <button 
//                                 onClick={() => handleViewProfile(app.applicant)} 
//                                 className="px-1.5 py-0.5 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200 transition"
//                               >
//                                 View Profile
//                               </button>
//                               <button 
//                                 onClick={() => handleAction(app.id, 'DELETE')} 
//                                 className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded hover:bg-yellow-200 transition"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <p className="text-gray-500 text-xs">Applicant details not available</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
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
//                 <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Applicant Profile Modal */}
//       {viewProfileData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-3">
//           <div className="bg-white max-w-2xl w-full rounded-xl p-3 sm:p-4 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setViewProfileData(null)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-800">Applicant Profile</h2>
//             <PersonalInfoModal
//               isEditing={false}
//               formData={viewProfileData}
//               handleInputChange={() => {}}
//               isUpdating={false}
//             />
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

const RoomDetailsPage = ({ roomId, isInline = false }) => {
  const navigate = useNavigate();

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
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-medium text-xs sm:text-sm">{room.configuration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Furnishing</p>
                    <p className="font-medium text-xs sm:text-sm">{room.furnished}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Preferred Gender</p>
                    <p className="font-medium text-xs sm:text-sm">{room.preferredGender}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Description</h2>
                  <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">{room.description || 'No description provided.'}</p>
                </div>

                {/* Amenities */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Amenities</h2>
                  {room.amenities?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                      {room.amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs sm:text-sm">No amenities listed</p>
                  )}
                </div>

                {/* Action Buttons */}
                {isRoomOwner && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button
                      onClick={handleEditClick}
                      className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md text-xs sm:text-sm"
                    >
                      Edit Listing
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md text-xs sm:text-sm"
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
            <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">Are you sure you want to permanently delete this room listing? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center text-xs sm:text-sm"
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
