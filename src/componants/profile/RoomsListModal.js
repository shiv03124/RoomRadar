import React from 'react';
import PropTypes from 'prop-types';

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
};

const RoomsListModal = ({ rooms }) => {
  if (!rooms || rooms.length === 0) {
    return <p className="text-gray-500">You haven't listed any rooms yet.</p>;
  }

  return (
    <div className="space-y-4">
      {rooms.map(room => (
        <div key={room.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex">
            {room.images && room.images.length > 0 && (
              <img
                src={room.images[0]}
                alt="Room"
                className="h-32 w-32 object-cover rounded-lg"
              />
            )}
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-lg">{room.title}</h3>
              <p className="text-gray-600">{room.description}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Type:</span>
                  <span className="ml-1 text-sm">{room.roomType}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Rent:</span>
                  <span className="ml-1 text-sm">₹{room.rent?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Location:</span>
                  <span className="ml-1 text-sm">{room.city}, {room.area}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Available:</span>
                  <span className="ml-1 text-sm">{room.availableFrom?.join('-')}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-500">Amenities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.amenities?.map((amenity, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Created: {formatDateTime(room.createdAt)}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {room.isAvailable ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

RoomsListModal.propTypes = {
  rooms: PropTypes.array
};

export default RoomsListModal;