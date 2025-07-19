// import React, { useState } from 'react';
// import ImageCarousel from './ImageCarousel';
// import ConfirmDialog from '../Toster/ConfirmDialog';
// import toast from 'react-hot-toast';
// import { fetchRoomApplications, deleteRoom } from '../utils/fetchUserProfile';
// import { LoadingToast, SuccessToast, ErrorToast } from '../Toster/ToastMessages';
// import close from '../images/close.png';
// import {
//   FaWifi, FaTv, FaSnowflake, FaParking, FaUtensils,
//   FaSwimmingPool, FaDumbbell, FaTshirt, FaLaptopHouse,
//   FaWater, FaHotTub, FaFan, FaBroom, FaKey, FaDog,
//   FaSmokingBan, FaFirstAid, FaMapMarkerAlt, FaRulerCombined,
//   FaHome, FaBed, FaMoneyBillWave, FaCalendarAlt, FaVenusMars,
//   FaInfoCircle
// } from 'react-icons/fa';
// import { MdPets, MdKitchen, MdLocalLaundryService, MdElevator } from 'react-icons/md';
// import { GiDoor, GiFloorPolisher } from 'react-icons/gi';

// const amenityIcons = {
//   'Wi-Fi': <FaWifi className="text-blue-500" />,
//   'TV': <FaTv className="text-purple-500" />,
//   'AC': <FaSnowflake className="text-blue-300" />,
//   'Parking': <FaParking className="text-gray-600" />,
//   'Kitchen': <MdKitchen className="text-orange-500" />,
//   'Laundry': <MdLocalLaundryService className="text-blue-600" />,
//   'Meals Included': <FaUtensils className="text-yellow-500" />,
//   'Swimming Pool': <FaSwimmingPool className="text-cyan-500" />,
//   'Gym': <FaDumbbell className="text-red-500" />,
//   'Elevator': <MdElevator className="text-gray-700" />,
//   'Pets Allowed': <FaDog className="text-brown-500" />,
//   'No Smoking': <FaSmokingBan className="text-red-400" />,
//   'Housekeeping': <FaBroom className="text-green-600" />,
//   '24/7 Water': <FaWater className="text-blue-400" />,
//   'Heating': <FaHotTub className="text-red-300" />,
//   'Workspace': <FaLaptopHouse className="text-indigo-500" />,
//   'Wardrobe': <FaTshirt className="text-gray-500" />,
//   'First Aid': <FaFirstAid className="text-red-500" />,
//   'Fan': <FaFan className="text-gray-400" />,
//   'Security': <FaKey className="text-yellow-600" />,
//   'Private Entrance': <GiDoor className="text-brown-600" />,
//   'Floor Cleaning': <GiFloorPolisher className="text-green-500" />
// };

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0
//   }).format(amount).replace('₹', '₹ ');
// };

// const RoomDetailsModal = ({ room, activeTab, onClose, onEdit, onDelete }) => {
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleDeleteClick = () => setShowConfirm(true);

//   const handleConfirmDelete = async () => {
//     setShowConfirm(false);
//     const loadingId = toast.loading(<LoadingToast message="Checking applications..." />);

//     try {
//       const applications = await fetchRoomApplications(room.id);
//       if (applications.length > 0) {
//         toast.dismiss(loadingId);
//         toast.error(<ErrorToast message="Cannot delete room. Applications exist." />);
//         return;
//       }

//       toast.loading(<LoadingToast message="Deleting room..." />, { id: loadingId });
//       await deleteRoom(room.id);
//       toast.dismiss(loadingId);
//       toast.success(<SuccessToast message="Room deleted successfully!" />);
//       onDelete(room.id);
//     } catch (err) {
//       toast.dismiss(loadingId);
//       toast.error(<ErrorToast message={`Failed to delete room: ${err.message}`} />);
//       console.error("Room deletion failed:", err);
//     }
//   };

//   const renderField = (icon, label, value, unit = '') => {
//     if (!value && value !== 0) return null;
//     return (
//       <div className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg">
//         <div className="text-gray-500 mt-1">{icon}</div>
//         <div>
//           <p className="text-xs text-gray-500">{label}</p>
//           <p className="text-gray-900 font-medium">
//             {value} {unit && <span className="text-gray-500 text-sm">{unit}</span>}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 text-center">
//         <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>

//         <div className="relative z-10 bg-white rounded-lg text-left shadow-xl max-w-4xl w-full flex flex-col max-h-[90vh]">
//           {/* Section 1: Sticky Header */}
//           <div className="sticky top-0 z-50 bg-white px-6 pt-4 pb-2 border-b">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900">{room.title}</h3>
//                 <p className="text-gray-600 flex items-center mt-1">
//                   <FaMapMarkerAlt className="mr-1 text-red-500" />
//                   {room.address}, {room.city}
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//                 title="Close"
//               >
//                 <img 
//                   src={close} 
//                   alt="Close"
//                   className="h-6 w-6"
//                 />
//               </button>
//             </div>
//           </div>

//           {/* Section 2: Scrollable Content */}
//           <div className="overflow-y-auto px-6 ">
//             <div className="border border-gray-300 rounded-xl overflow-hidden">
//   <ImageCarousel images={room.images} />
// </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 flex items-center">
//                   <FaHome className="mr-2 text-blue-500" />
//                   Basic Information
//                 </h4>
//                 {renderField(<FaRulerCombined />, 'Area', room.area, 'sq ft')}
//                 {renderField(<FaBed />, 'Room Type', room.roomType)}
//                 {renderField(<FaInfoCircle />, 'Furnishing', room.furnished)}
//                 {renderField(<FaInfoCircle />, 'Vacancies', room.noofvacancies)}
//                 {renderField(<FaInfoCircle />, 'Configuration', room.configuration)}
//                 {renderField(<FaInfoCircle />, 'Accommodation Type', room.accommodationType)}
//               </div>

//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 flex items-center">
//                   <FaMoneyBillWave className="mr-2 text-green-500" />
//                   Financial Details
//                 </h4>
//                 {renderField(<FaMoneyBillWave />, 'Monthly Rent', formatCurrency(room.rent))}
//                 {renderField(<FaKey />, 'Security Deposit', formatCurrency(room.securityDeposit))}
//               </div>

//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 flex items-center">
//                   <FaCalendarAlt className="mr-2 text-purple-500" />
//                   Availability
//                 </h4>
//                 {renderField(<FaCalendarAlt />, 'Available From', room.availableFrom ? new Date(room.availableFrom).toLocaleDateString('en-IN') : 'Immediate')}
//                 {renderField(<FaInfoCircle />, 'Lock-in Period', room.lockInPeriod ? `${room.lockInPeriod} months` : 'None')}
//               </div>

//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 flex items-center">
//                   <FaVenusMars className="mr-2 text-pink-500" />
//                   Preferences
//                 </h4>
//                 {renderField(<FaVenusMars />, 'Preferred Gender', room.preferredGender || 'Any')}
//               </div>
//             </div>

//             <div className="mt-6">
//               <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 mb-3">Description</h4>
//               <p className="text-gray-700 whitespace-pre-line">{room.description || 'No description provided'}</p>
//             </div>

//             {room.amenities?.length > 0 && (
//               <div className="mt-6">
//                 <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 mb-3">Amenities</h4>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                   {room.amenities.map((amenity, index) => (
//                     <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
//                       <span className="text-lg">{amenityIcons[amenity] || <FaInfoCircle className="text-gray-500" />}</span>
//                       <span className="text-sm text-gray-700">{amenity}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {(room.nearbyPlaces || room.rules) && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 {room.nearbyPlaces && (
//                   <div>
//                     <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 mb-3">Nearby Places</h4>
//                     <ul className="list-disc list-inside text-gray-700 space-y-1">
//                       {room.nearbyPlaces.split('\n').map((place, i) => (
//                         <li key={i}>{place.trim()}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 {room.rules && (
//                   <div>
//                     <h4 className="font-semibold text-lg text-gray-800 border-b pb-2 mb-3">House Rules</h4>
//                     <ul className="list-disc list-inside text-gray-700 space-y-1">
//                       {room.rules.split('\n').map((rule, i) => (
//                         <li key={i}>{rule.trim()}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Section 3: Fixed Footer */}
//           <div className="sticky bottom-0 bg-gray-50 px-6 py-3 flex justify-end border-t">
//             {activeTab === 'My Listings' && (
//               <>
//                 <button
//                   onClick={() => onEdit(room)}
//                   className="inline-flex justify-center rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 ml-3"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDeleteClick}
//                   className="inline-flex justify-center rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700 ml-3"
//                 >
//                   Delete
//                 </button>
//               </>
//             )}
//             <button
//   onClick={onClose}
//   className="inline-flex justify-center rounded-md border border-gray-200 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 ml-3"
// >
//   Close
// </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmDialog
//         isOpen={showConfirm}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this room? This action cannot be undone."
//         onConfirm={handleConfirmDelete}
//         onCancel={() => setShowConfirm(false)}
//       />
//     </div>
//   );
// };

// export default RoomDetailsModal;