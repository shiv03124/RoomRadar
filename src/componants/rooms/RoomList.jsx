import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms, loading, error, activeTab, onViewDetails, onFetchApplications, isAppliedView }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div> 
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900">No rooms found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {activeTab === 'My Listings' 
            ? "You haven't added any rooms yet." 
            : activeTab === 'Applied Rooms'
            ? "You haven't applied to any rooms yet."
            : "No rooms are currently available."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <RoomCard 
          key={room.id}
          room={room}
          activeTab={activeTab}
          onViewDetails={onViewDetails}
          onFetchApplications={onFetchApplications}
          isAppliedView={isAppliedView}  // Pass the prop here
        />
      ))}
    </div>
  );
};

export default RoomList;