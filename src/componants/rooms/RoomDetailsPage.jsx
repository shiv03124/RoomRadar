import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomById, deleteRoom } from '../utils/fetchUserProfile';
import toast from 'react-hot-toast';
import EditRoomModal from './EditRoomModal';
import { ErrorToast, SuccessToast, LoadingToast } from '../Toster/ToastMessages';
import { 
  FiWifi, FiAirplay, FiWatch, FiHome, FiMapPin, FiDroplet
} from 'react-icons/fi';
import { MdMicrowave } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

const RoomDetailsPage = ({ roomId: propRoomId, isInline = false }) => {
  const { roomId: urlRoomId } = useParams();
  const roomId = propRoomId || urlRoomId; // Use prop first, then URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(false);
  const elementRef = useRef(null);
  const navigate = useNavigate();

  const toastOptions = {
    loading: {
      duration: Infinity,
      position: 'top-right'
    }
  };

  const availableAmenities = [
    { name: 'Wi-Fi', icon: <FiWifi className="text-blue-500" size={18} /> },
    { name: 'A/C', icon: <FiAirplay className="text-blue-400" size={18} /> },
    { name: 'Washing Machine', icon: <FiWatch className="text-indigo-500" size={18} /> },
    { name: 'Refrigerator', icon: <MdMicrowave className="text-green-500" size={18} /> },
    { name: 'TV', icon: <FiHome className="text-red-500" size={18} /> },
    { name: 'Microwave', icon: <MdMicrowave className="text-orange-500" size={18} /> },
    { name: 'Furniture', icon: <FiHome className="text-amber-500" size={18} /> },
    { name: 'Parking', icon: <FiMapPin className="text-gray-600" size={18} /> },
    { name: 'Gym', icon: <FiDroplet className="text-purple-500" size={18} /> },
    { name: 'Swimming Pool', icon: <FiDroplet className="text-blue-300" size={18} /> },
  ];

  const fetchRoom = async () => {
    setLoading(true);
    try {
      const data = await getRoomById(roomId);
      setRoom(data);
      // Check if user has already applied (you might need to implement this)
      // setApplied(data.hasApplied || false);
    } catch (error) {
      console.error("Error loading room data:", error);
      toast.custom((t) => <ErrorToast message="Failed to load room details." t={t} />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roomId) {
      toast.error("Room ID is missing");
      return;
    }
    fetchRoom();    
  }, [roomId]);

  const nextImage = () => {
    if (!room?.images?.length) return;
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!room?.images?.length) return;
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const handleDeleteClick = () => setShowConfirmDelete(true);

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

  const handleEditClick = () => setShowEditModal(true);

  const handleRoomUpdated = (updatedRoom) => {
    setRoom(updatedRoom);
    setShowEditModal(false);
  };

  const handleApplyClick = () => {
    setShowMessageInput(true);
  };

  const handleConfirmApplication = async () => {
    if (!message.trim()) {
      toast.custom((t) => <ErrorToast message="Message cannot be empty." t={t} />, {
        duration: 4000,
        position: 'top-right',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.custom((t) => <ErrorToast message="You must log in to apply for this room." t={t} />, {
        duration: 4000,
        position: 'top-right',
      });
      return;
    }

    const toastId = toast.loading(<LoadingToast message="Submitting your application..." />, toastOptions.loading);

    try {
      // Replace this with your actual API call
      // const { success, alreadyApplied } = await handleApply(room.id, message);
      // Mock response for demonstration
      const success = true;
      const alreadyApplied = false;
      
      toast.dismiss(toastId);

      if (success) {
        setApplied(true);
        setShowMessageInput(false);
        setMessage('');
        const resultMsg = alreadyApplied
          ? "You've already applied to this room"
          : "Application submitted successfully!";
        toast.custom((t) => <SuccessToast message={resultMsg} t={t} />, {
          id: toastId,
          duration: 4000,
          position: 'top-right',
        });
      } else {
        throw new Error('Application failed');
      }
    } catch (error) {
      toast.custom((t) => <ErrorToast message="Failed to submit application. Please try again." t={t} />, {
        id: toastId,
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  const loggedInUserId = localStorage.getItem('userId');
  const isRoomOwner = loggedInUserId && room?.user?.id && loggedInUserId === String(room.user.id);

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
    <div ref={elementRef} className={`${isInline ? 'w-full' : 'bg-gray-100 min-h-screen pb-10'} pt-14 `}>
      <div className={`${isInline ? 'w-full' : 'container mx-auto px-4 sm:px-6 py-5'} `}>
        <div className="flex flex-col gap-4 lg:gap-6">
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
                    <FiMapPin className="mr-1" />
                    <span>{room.address}, {room.city}, {room.area}</span>
                  </div>
                </div>
              </div>

              {/* Price and Info */}
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
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Description</h2>
                <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">
                  {room.description || 'No description provided.'}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-200">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                        <span className={`text-xs sm:text-sm flex-1 ${available ? 'text-gray-800' : 'text-gray-500'}`}>
                          {amenity.name}
                        </span>
                        {available ? <BsCheckCircle className="text-green-500" size={16} /> : <span className="text-gray-400 text-xs">X</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-md text-sm"
                >
                  Back to Dashboard
                </button>
                
                {/* Show Apply button only if user is not the room owner */}
                {!isRoomOwner && (
                  <>
                    {!applied ? (
                      showMessageInput ? (
                        <div className="w-full flex flex-col gap-3">
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message to the owner..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleConfirmApplication}
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md text-sm"
                            >
                              Submit Application
                            </button>
                            <button
                              onClick={() => setShowMessageInput(false)}
                              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-md text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleApplyClick}
                          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md text-sm"
                        >
                          Apply for this Room
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg shadow-md text-sm cursor-not-allowed"
                      >
                        Application Submitted
                      </button>
                    )}
                  </>
                )}

                {/* Show Edit/Delete buttons only if user is the room owner */}
                {isRoomOwner && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
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
              <button onClick={() => setShowConfirmDelete(false)} className="text-gray-500 hover:text-gray-700">X</button>
            </div>
            <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
              Are you sure you want to permanently delete this room listing? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button onClick={() => setShowConfirmDelete(false)} className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;