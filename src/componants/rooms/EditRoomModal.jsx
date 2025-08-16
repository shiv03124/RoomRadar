import React, { useState, useEffect } from 'react';
import RoomForm from './RoomForm';
import { updateRoom } from '../utils/fetchUserProfile';
import toast from 'react-hot-toast';
import { toastOptions } from '../utils/toastConfig';
import { ErrorToast, SuccessToast } from '../Toster/ToastMessages';
import closeIcon from '../images/close.png';

const EditRoomModal = ({ room, onClose, onRoomUpdated }) => {
  const [editingRoom, setEditingRoom] = useState({
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
    preferredGender: 'Any',
    isAvailable: true,
    amenities: [],
    images: []
  });

  useEffect(() => {
    if (room) {
      setEditingRoom({
        title: room.title || '',
        description: room.description || '',
        address: room.address || '',
        city: room.city || 'Pune',
        area: room.area || '',
        noofvacancies: room.noofvacancies || '',
        accommodationType: room.accommodationType || 'PG',
        configuration: room.configuration || '',
        furnished: room.furnished || 'Fully',
        availableFrom: room.availableFrom || '',
        rent: room.rent || '',
        securityDeposit: room.securityDeposit || '',
        preferredGender: room.preferredGender || 'Any',
        isAvailable: room.isAvailable ?? true,
        amenities: room.amenities || [],
        images: room.images || []
      });
    }
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Updating room...', toastOptions.loading);

    try {
      const updatedRoom = await updateRoom(editingRoom, room.id);
      onRoomUpdated(updatedRoom);

      toast.dismiss(toastId);
      toast.custom((t) => (
        <SuccessToast message="Room updated successfully!" t={t} />
      ), {
        id: toastId,
        duration: 4000,
        position: 'top-right',
      });

      onClose();
    } catch (err) {
      console.error("Room update failed:", err);
      toast.dismiss(toastId);
      toast.custom((t) => (
        <ErrorToast message={`Failed to update room: ${err.message}`} t={t} />
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
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal Container */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full max-h-[80vh] overflow-y-auto relative">

          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-white border-b px-4 pt-4 pb-3 sm:px-6 flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Room</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <img
                src={closeIcon}
                alt="Close"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Modal Body */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <RoomForm
              room={editingRoom}
              setRoom={setEditingRoom}
              onSubmit={handleSubmit}
              onCancel={onClose}
              submitButtonText="Update Room"
              isEditing={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoomModal;
