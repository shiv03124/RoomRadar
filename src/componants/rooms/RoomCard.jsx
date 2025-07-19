// import React, { useState } from 'react';
// import { handleApply, fetchUserProfile, formatLocalDateTime, fetchRoomApplications } from '../utils/fetchUserProfile';
// import toast from 'react-hot-toast';
// import { toastOptions } from '../utils/toastConfig';
// import { LoadingToast, SuccessToast, ErrorToast, CloseButton } from '../Toster/ToastMessages';
// import { CiLocationArrow1 } from 'react-icons/ci';
// import RoomDetailsPage from './RoomDetailsPage'; // Import RoomDetailsPage
// import { useNavigate } from 'react-router-dom';

// const RoomCard = ({
//   room,
//   activeTab,
//   onFetchApplications,
//   isAppliedView = false,
//   onToggleDetails,
//   isExpanded = false,
//   onViewDetails
// }) => {
//   const navigate = useNavigate();

//   const [applied, setApplied] = useState(false);
//   const [showMessageInput, setShowMessageInput] = useState(false);
//   const [message, setMessage] = useState('I need a room');
//   const [applicationStatus, setApplicationStatus] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showUserDetails, setShowUserDetails] = useState(false);

//   const onApplyClick = () => setShowMessageInput(true);

//   const handleConfirmApplication = async () => {
//     if (!message.trim()) {
//       toast.custom((t) => <ErrorToast message="Message cannot be empty." t={t} />, {
//         duration: 4000,
//         position: 'top-right',
//       });
//       return;
//     }

//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       toast.custom((t) => <ErrorToast message="You must log in to apply for this room." t={t} />, {
//         duration: 4000,
//         position: 'top-right',
//       });
//       return;
//     }

//     const toastId = toast.loading(<LoadingToast message="Submitting your application..." />, toastOptions.loading);

//     try {
//       const { success, alreadyApplied } = await handleApply(room.id, message);
//       toast.dismiss(toastId);

//       if (success) {
//         setApplied(true);
//         setShowMessageInput(false);
//         setMessage('');
//         const resultMsg = alreadyApplied
//           ? "You've already applied to this room"
//           : "Application submitted successfully!";
//         toast.custom((t) => <SuccessToast message={resultMsg} t={t} />, {
//           id: toastId,
//           duration: 4000,
//           position: 'top-right',
//         });
//       } else {
//         throw new Error('Application failed');
//       }
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.custom((t) => <ErrorToast message="Failed to submit application. Please try again." t={t} />, {
//         id: toastId,
//         duration: 4000,
//         position: 'top-right',
//       });
//     }
//   };

//   const handleApplicationsClick = async (e) => {
//     e.stopPropagation();
//     const applications = await fetchRoomApplications(room.id);
//     onFetchApplications(applications)
//   };



//   const handleUserDetailsClick = async (e) => {
//     e.stopPropagation();

//     const toastId = toast.loading(<LoadingToast message="Checking application status..." />, toastOptions.loading);

//     try {
//       const profile = await fetchUserProfile();
//       if (!profile?.id) {
//         toast.error(<ErrorToast message="Failed to fetch user profile." />, {
//           id: toastId,
//           ...toastOptions.error,
//         });
//         return;
//       }

//       sessionStorage.setItem('userid', profile.id);
//       const token = sessionStorage.getItem('token');
//       const userId = sessionStorage.getItem('userid');

//       if (!userId || !token) {
//         toast.error(<ErrorToast message="User not logged in or token missing." />, {
//           id: toastId,
//           ...toastOptions.error,
//         });
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:8080/api/applications/status?userId=${userId}&roomId=${room.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error('Failed to fetch application status.');

//       const data = await response.json();
//       setApplicationStatus(data);
//       setShowUserDetails(true);

//       if (data === 'ACCEPTED') {
//         toast.success(<SuccessToast message="Application accepted. Showing owner details..." />, {
//           id: toastId,
//           icon: null,
//           ...toastOptions.success,
//         });
//         setShowModal(true);
//       } else {
//         toast.dismiss(toastId);
//         toast.error(
//           (t) => (
//             <div className="toast-message flex items-center justify-between w-full">
//               <div className="flex items-center space-x-2">
//                 <span>You can only view owner details after your application is accepted.</span>
//               </div>
//               <CloseButton onClose={() => toast.dismiss(t.id)} />
//             </div>
//           ),
//           {
//             id: toastId,
//             ...toastOptions.error,
//             duration: 4000,
//           }
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(<ErrorToast message="Error fetching application status." />, {
//         id: toastId,
//         ...toastOptions.error,
//       });
//     }
//   };

//   const application = room.application;
//   const formattedDate = application ? formatLocalDateTime(application.applicationDate) : null;

//   return (
//     <div>
//      <div className="w-full bg-white shadow-sm border rounded-xl p-4 hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-4 cursor-pointer" >
//   {/* Left: Room Image */}
//         <div className="w-full md:w-1/4 h-36">
//           {room.images?.[0] ? (
//             <img
//               src={room.images[0]}
//               alt={room.title}
//               className="w-full h-full object-cover rounded-lg border border-gray-500"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
//               <span className="text-gray-500">No Image</span>
//             </div>
//           )}
//         </div>

//         {/* Right: Room Details */}
//         <div className="flex-1 flex flex-col justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               {room.title || 'Untitled Room'}
//             </h3>
//             <p className="text-sm text-gray-500">{room.area}, {room.city}</p>
//             {isAppliedView && formattedDate && (
//               <p className="text-xs text-gray-400 mt-1">Applied on: {formattedDate}</p>
//             )}
//           </div>

//           <div className="mt-3">
//             <div className="grid grid-cols-3 gap-2 text-sm">
//               <div>
//                 <p className="text-gray-400">Rent</p>
//                 <p className="font-medium text-gray-900">₹{room.rent || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400">Deposit</p>
//                 <p className="font-medium text-gray-900">₹{room.securityDeposit || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400">Vacancies</p>
//                 <p className="font-medium text-gray-900">{room.noofvacancies || 0}</p>
//               </div>
//             </div>

//             {/* <div className="flex flex-row flex-wrap gap-2 mt-4 w-full"> */}


// <div className="flex flex-row flex-wrap sm:flex-row justify-center items-center gap-2 mt-2">

//               {isAppliedView ? (
//                 <>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); onViewDetails(e); }}
//                     className="min-w-[204px] px-4 py-1.5 whitespace-nowrap text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); handleUserDetailsClick(e); }}
//                     className=" min-w-[204px] px-4 py-1.5 whitespace-nowrap text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
//                   >
//                     User Details
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); onViewDetails(e); }}
//                     className="min-w-[204px] px-4 py-1.5 md:pb-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
//                   >
//                     View
//                   </button>

//                   {activeTab === 'My Listings' && (
//                     <button
//                       onClick={(e) => { e.stopPropagation(); handleApplicationsClick(e); }}
//                       className="min-w-[204px] px-4 py-1.5 md:pb-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
//                     >
//                       View Applications
//                     </button>
//                   )}

//                   {!applied && activeTab === 'All Listings' && (
//                     <button
//                       onClick={(e) => { e.stopPropagation(); onApplyClick(); }}
//                       className="min-w-[204px] px-4 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100"
//                     >
//                       Apply
//                     </button>
//                   )}

//                   {applied && (
//                     <span className="min-w-[203px] px-4 py-1.5 text-sm text-green-600 font-semibold">
//                       Applied
//                     </span>
//                   )}
//                 </>
//               )}
//             </div>

//             {showMessageInput && !applied && (
//               <div className="mt-3 flex flex-col sm:flex-row gap-2 w-full">

//                 <input
//                   type="text"
//                   className="flex-1 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-400"
//                   placeholder="Write your message to the room owner..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                   onClick={handleConfirmApplication}
//                   className="flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                   title="Send Application"
//                 >
//                   <CiLocationArrow1 className="text-lg" />
//                   Send
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//             <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
//               <h2 className="text-lg font-semibold mb-2">Owner Details</h2>
//               <p><strong>Name:</strong> {room?.user?.fullName || 'N/A'}</p>
//               <p><strong>Email:</strong> {room?.user?.email || 'N/A'}</p>
//               <p><strong>Phone:</strong> {room?.user?.phone || 'N/A'}</p>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Inline Room Details Below the Card */}
//       {isExpanded && (
//         <div className="mt-4 border rounded-lg p-4 bg-gray-50 shadow-inner">
//           <RoomDetailsPage roomId={room.id} />
//         </div>
//       )}
//     </div>
//   );
// };

// export const RoomCardGrid = ({ rooms, activeTab, onFetchApplications, isAppliedView, onViewDetails }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
//       {rooms.map((room) => (
//         <div key={room.id}>
//           <RoomCard
//             room={room}
//             activeTab={activeTab}
//             onFetchApplications={onFetchApplications}
//             isAppliedView={isAppliedView}
//             onViewDetails={(e) => onViewDetails(room.id, e)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };


// export default RoomCard;


import React, { useState } from 'react';
import { handleApply, fetchUserProfile, formatLocalDateTime, fetchRoomApplications } from '../utils/fetchUserProfile';
import toast from 'react-hot-toast';
import { toastOptions } from '../utils/toastConfig';
import { LoadingToast, SuccessToast, ErrorToast, CloseButton } from '../Toster/ToastMessages';
import { CiLocationArrow1 } from 'react-icons/ci';
import RoomDetailsPage from './RoomDetailsPage'; // Import RoomDetailsPage
import { useNavigate } from 'react-router-dom';

const RoomCard = ({
  room,
  activeTab,
  onFetchApplications,
  isAppliedView = false,
  onToggleDetails,
  isExpanded = false,
  onViewDetails
}) => {
  const navigate = useNavigate();

  const [applied, setApplied] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState('I need a room');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const onApplyClick = () => setShowMessageInput(true);

  const handleConfirmApplication = async () => {
    if (!message.trim()) {
      toast.custom((t) => <ErrorToast message="Message cannot be empty." t={t} />, {
        duration: 4000,
        position: 'top-right',
      });
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.custom((t) => <ErrorToast message="You must log in to apply for this room." t={t} />, {
        duration: 4000,
        position: 'top-right',
      });
      return;
    }

    const toastId = toast.loading(<LoadingToast message="Submitting your application..." />, toastOptions.loading);

    try {
      const { success, alreadyApplied } = await handleApply(room.id, message);
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
      toast.dismiss(toastId);
      toast.custom((t) => <ErrorToast message="Failed to submit application. Please try again." t={t} />, {
        id: toastId,
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  const handleApplicationsClick = async (e) => {
    e.stopPropagation();
    const applications = await fetchRoomApplications(room.id);
    onFetchApplications(applications)
  };

  const handleUserDetailsClick = async (e) => {
    e.stopPropagation();

    const toastId = toast.loading(<LoadingToast message="Checking application status..." />, toastOptions.loading);

    try {
      const profile = await fetchUserProfile();
      if (!profile?.id) {
        toast.error(<ErrorToast message="Failed to fetch user profile." />, {
          id: toastId,
          ...toastOptions.error,
        });
        return;
      }

      sessionStorage.setItem('userid', profile.id);
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userid');

      if (!userId || !token) {
        toast.error(<ErrorToast message="User not logged in or token missing." />, {
          id: toastId,
          ...toastOptions.error,
        });
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/applications/status?userId=${userId}&roomId=${room.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch application status.');

      const data = await response.json();
      setApplicationStatus(data);
      setShowUserDetails(true);

      if (data === 'ACCEPTED') {
        toast.success(<SuccessToast message="Application accepted. Showing owner details..." />, {
          id: toastId,
          icon: null,
          ...toastOptions.success,
        });
        setShowModal(true);
      } else {
        toast.dismiss(toastId);
        toast.error(
          (t) => (
            <div className="toast-message flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span>You can only view owner details after your application is accepted.</span>
              </div>
              <CloseButton onClose={() => toast.dismiss(t.id)} />
            </div>
          ),
          {
            id: toastId,
            ...toastOptions.error,
            duration: 4000,
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(<ErrorToast message="Error fetching application status." />, {
        id: toastId,
        ...toastOptions.error,
      });
    }
  };

  const application = room.application;
  const formattedDate = application ? formatLocalDateTime(application.applicationDate) : null;

  return (
    <div>
      <div className="w-full bg-white shadow-sm border rounded-xl p-4 hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-4 cursor-pointer" >
        {/* Left: Room Image */}
        <div className="w-full md:w-1/4 h-36">
          {room.images?.[0] ? (
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover rounded-lg border border-gray-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Right: Room Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {room.title || 'Untitled Room'}
            </h3>
            <p className="text-sm text-gray-500">{room.area}, {room.city}</p>
            {isAppliedView && formattedDate && (
              <p className="text-xs text-gray-400 mt-1">Applied on: {formattedDate}</p>
            )}
          </div>

          <div className="mt-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Rent</p>
                <p className="font-medium text-gray-900">₹{room.rent || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Deposit</p>
                <p className="font-medium text-gray-900">₹{room.securityDeposit || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Vacancies</p>
                <p className="font-medium text-gray-900">{room.noofvacancies || 0}</p>
              </div>
            </div>

            <div className="flex flex-row flex-wrap sm:flex-row justify-center items-center gap-2 mt-2">

              {isAppliedView ? (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewDetails(e); }}
                    className="min-w-[200px] px-4 py-1.5 whitespace-nowrap text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleUserDetailsClick(e); }}
                    className="min-w-[200px] px-4 py-1.5 whitespace-nowrap text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    User Details
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewDetails(e); }}
                    // <== VIEW button always same styling, no condition here
                    className="min-w-[200px] px-4 py-1.5 md:pb-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    View
                  </button>

                  {activeTab === 'My Listings' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApplicationsClick(e); }}
                      className="min-w-[200px] px-4 py-1.5 md:pb-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      View Applications
                    </button>
                  )}

                  {!applied && activeTab === 'All Listings' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onApplyClick(); }}
                      className="min-w-[204px] px-4 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100"
                    >
                      Apply
                    </button>
                  )}

                  {applied && (
                    <span className="min-w-[203px] px-4 py-1.5 text-sm text-green-600 font-semibold">
                      Applied
                    </span>
                  )}
                </>
              )}
            </div>

            {showMessageInput && !applied && (
              <div className="mt-3 flex flex-col sm:flex-row gap-2 w-full">

                <input
                  type="text"
                  className="flex-1 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Write your message to the room owner..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleConfirmApplication}
                  className="flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  title="Send Application"
                >
                  <CiLocationArrow1 className="text-lg" />
                  Send
                </button>
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
              <h2 className="text-lg font-semibold mb-2">Owner Details</h2>
              <p><strong>Name:</strong> {room?.user?.fullName || 'N/A'}</p>
              <p><strong>Email:</strong> {room?.user?.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {room?.user?.phone || 'N/A'}</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inline Room Details Below the Card */}
      {isExpanded && (
        <div className="mt-4 border rounded-lg p-4 bg-gray-50 shadow-inner">
          <RoomDetailsPage roomId={room.id} />
        </div>
      )}
    </div>
  );
};

export const RoomCardGrid = ({ rooms, activeTab, onFetchApplications, isAppliedView, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {rooms.map((room) => (
        <div key={room.id}>
          <RoomCard
            room={room}
            activeTab={activeTab}
            onFetchApplications={onFetchApplications}
            isAppliedView={isAppliedView}
            onViewDetails={(e) => onViewDetails(room.id, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default RoomCard;
