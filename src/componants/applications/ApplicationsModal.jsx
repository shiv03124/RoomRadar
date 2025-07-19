import { useState } from "react";
import { handleApplicationAction } from '../utils/fetchUserProfile';
import toast from 'react-hot-toast';
import { SuccessToast, ErrorToast } from "../Toster/ToastMessages";
import logo from '../images/profile.png';
import maleFallback from '../images/profile.png';
import femaleFallback from '../images/woman.png';
import close from '../images/close.png';

const ApplicationsModal = ({ applications: initialApplications, selectedRoom, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [applications, setApplications] = useState(initialApplications);

  const handleImageClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUserPopup = () => {
    setSelectedUser(null);
  };

  const getFallbackImage = (gender) => {
    if (!gender) return logo;
    if (gender.toLowerCase() === 'male') return maleFallback;
    if (gender.toLowerCase() === 'female') return femaleFallback;
    return logo;
  };

  const handleImgError = (e, gender) => {
    e.target.onerror = null;
    e.target.src = getFallbackImage(gender);
  };

  const handleAction = async (applicationId, action) => {
    const loadingToastId = toast.loading(`Processing ${action.toLowerCase()}...`);

    try {
      await handleApplicationAction(applicationId, action);
      
      // Update the applications state
      setApplications(prevApps => 
        prevApps.map(app => 
          app.id === applicationId 
            ? { ...app, status: action } 
            : app
        ).filter(app => action !== 'DELETE' || app.id !== applicationId)
      );

      toast.dismiss(loadingToastId);
      toast.custom((t) => (
        <SuccessToast message={`Application ${action.toLowerCase()} successfully!`} t={t} />
      ), { duration: 4000 });
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.custom((t) => (
        <ErrorToast message={`Failed to process application: ${err.message}`} t={t} />
      ), { duration: 5000 });
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Applications for <span className="text-indigo-600">{selectedRoom?.title || 'this room'}</span>
            </h2>
            <button
              onClick={onClose}
              className="hover:opacity-80 transition duration-200"
              title="Close"
            >
              <img src={close} alt="Close" className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {selectedUser ? (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200">
              <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                <img
                  src={selectedUser.profileImageUrl || getFallbackImage(selectedUser.gender)}
                  alt={selectedUser.fullName || 'User'}
                  className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover"
                  onError={(e) => handleImgError(e, selectedUser.gender)}
                />
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{selectedUser.fullName}</h2>
                  <p className="text-xs sm:text-sm text-gray-500">{selectedUser.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full text-xs sm:text-sm">
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="font-medium text-gray-800">{selectedUser.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Gender</p>
                    <p className="font-medium text-gray-800">{selectedUser.gender || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Occupation</p>
                    <p className="font-medium text-gray-800">{selectedUser.occupation || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Age</p>
                    <p className="font-medium text-gray-800">{selectedUser.age || 'Not specified'}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseUserPopup}
                  className="mt-2 sm:mt-4 px-3 sm:px-4 py-1 sm:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm sm:text-base"
                >
                  Close 
                </button>
              </div>
            </div>
          ) : applications?.length > 0 ? (
            <div className="space-y-4 sm:space-y-6 max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">
              {applications.map((application) => (
                <div key={application?.id} className="rounded-lg sm:rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition p-3 sm:p-4 flex gap-3 sm:gap-6 items-start">
                  <div>
                    {application?.applicant?.profileImageUrl ? (
                      <img
                        src={application.applicant.profileImageUrl}
                        alt={application.applicant.fullName || 'User'}
                        onClick={() => handleImageClick(application.applicant)}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        onError={(e) => handleImgError(e, application.applicant.gender)}
                      />
                    ) : (
                      <div
                        onClick={() => handleImageClick(application.applicant)}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      >
                        <img
                          src={getFallbackImage(application.applicant.gender)}
                          alt={application.applicant.fullName || 'User'}
                          className="h-full w-full object-cover"
                          onError={(e) => handleImgError(e, application.applicant.gender)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400">Applied on</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">
                          {(() => {
                            const raw = application?.appliedAt;
                            if (!Array.isArray(raw) || raw.length < 6) return "Invalid date";

                            try {
                              const [year, month, day, hour, minute, second] = raw;
                              const date = new Date(year, month - 1, day, hour, minute, second);

                              return date.toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              });
                            } catch (err) {
                              console.error("Date parsing error:", err);
                              return "Invalid date format";
                            }
                          })()}
                        </p>
                      </div>

                      <span className={`text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${
                        application?.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        application?.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {application?.status || 'UNKNOWN'}
                      </span>
                    </div>

                    <div className="mt-2 sm:mt-3">
                      <p className="text-xs sm:text-sm text-gray-400">Message</p>
                      <p className="bg-gray-50 p-2 sm:p-3 rounded-md text-gray-700 whitespace-pre-wrap text-xs sm:text-sm">
                        {application?.message || 'No message provided'}
                      </p>
                    </div>

                    <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-4">
                      <button
                        onClick={() => handleAction(application.id, 'ACCEPTED')}
                        className="p-1 sm:p-2 rounded-full bg-green-100 hover:bg-green-200 text-xs sm:text-base"
                        title="Approve"
                        disabled={application?.status === 'ACCEPTED'}
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => handleAction(application.id, 'REJECTED')}
                        className="p-1 sm:p-2 rounded-full bg-red-100 hover:bg-red-200 text-xs sm:text-base"
                        title="Reject"
                        disabled={application?.status === 'REJECTED'}
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => handleAction(application.id, 'DELETE')}
                        className="p-1 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs sm:text-base"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-16">
              <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No applications</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">This room hasn't received any applications yet.</p>
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-4 sm:px-6 py-3 text-right border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 shadow text-xs sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;