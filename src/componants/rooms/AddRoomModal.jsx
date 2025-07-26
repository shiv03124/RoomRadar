import React, { useState, useEffect, useRef } from 'react';
import RoomForm from './RoomForm';
import { addRoom } from '../utils/fetchUserProfile';
import toast from 'react-hot-toast';
import { toastOptions } from '../utils/toastConfig';
import closeIcon from '../images/close.png';
import { ErrorToast, WaitingToast } from '../Toster/ToastMessages';

const AddRoomModal = ({ onClose, onRoomAdded, userData }) => {
  const modalRef = useRef();
  const [imageError, setImageError] = useState('');

  

  const initialRoomState = {
    title: '',
    description: '',
    address: '',
    city: 'Pune',
    area: '',
    noofvacancies: '',
    accommodationType: 'PG',
    configuration: '',
    furnished: 'Fully',
    availableFrom: '',
    rent: '',
    securityDeposit: '',
    preferredGender: '',
    totalNoOfPeoples:'',
    isAvailable: true,
    amenities: [],
    images: [],
  };

  const [newRoom, setNewRoom] = useState(initialRoomState);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        event.stopPropagation(); // Prevent accidental closing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
const handleSubmit = async (e) => {
  e.preventDefault();

  const toastId = toast.loading('Adding room...', toastOptions.loading);

  try {
    // Validate required fields
    if (
      !newRoom.title ||
      !newRoom.rent ||
      !newRoom.area ||
      !newRoom.accommodationType ||
      !newRoom.address ||
      !newRoom.city ||
      !newRoom.availableFrom ||
      !newRoom.furnished ||
      !newRoom.preferredGender ||
      !newRoom.noofvacancies
    ) {
      throw new Error('Please fill all required fields');
    }

    if (newRoom.accommodationType === 'Flat') {
      if (!newRoom.configuration || !newRoom.totalNoOfPeoples) {
        throw new Error('Please specify configuration and total number of people for a Flat');
      }
    }

    // Image validation
    if (!newRoom.images || newRoom.images.length === 0) {
      setImageError(true);  // triggers validation message
      toast.dismiss(toastId);
      toast.error("At least one image is required", { id: toastId });
      return;
    } else {
      setImageError(false); // reset if valid
    }

    const userId = userData?.id || sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID is missing. Please re-login.');
    }

    const result = await addRoom(newRoom, userId);
    onRoomAdded(result);

    toast.dismiss(toastId);

    toast.custom((t) => (
      <WaitingToast message="Room will be approved by RoomRadar soon!" t={t} />
    ), {
      id: toastId,
      duration: 4000,
      position: 'top-right',
    });

    onClose();
  } catch (err) {
    console.error('Room creation failed:', err);
    toast.dismiss(toastId);
    toast.custom((t) => (
      <ErrorToast message={`Failed to add room: ${err.message}`} t={t} />
    ), {
      id: toastId,
      duration: 5000,
      position: 'top-right',
    });
  }
};



  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop (no click-to-close) */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal Container */}
        <div
          ref={modalRef}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full max-h-[80vh] overflow-y-auto relative"
        >
          <div className="relative">
            <div className="sticky top-1 z-10 flex justify-end p-2 bg-white">
              <button
                onClick={onClose}
                className="rounded-full bg-gray-150 hover:bg-gray-300 transition-colors"
                aria-label="Close"
              >
                <img src={closeIcon} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Room</h3>
              <RoomForm
                room={newRoom}
                setRoom={setNewRoom}
                onSubmit={handleSubmit}
                onCancel={onClose}
                submitButtonText="Add Room"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
