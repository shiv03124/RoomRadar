import React from 'react';
import PropTypes from 'prop-types';
import { FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const statusIcons = {
  pending: <FiClock className="text-yellow-500" />,
  approved: <FiCheckCircle className="text-green-500" />,
  rejected: <FiXCircle className="text-red-500" />,
  cancelled: <FiAlertCircle className="text-gray-500" />
};

const ApplicationsListModal = ({ applications, onClose }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
          <FiAlertCircle className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
        <p className="text-gray-500">
          You haven't submitted any applications yet. When you do, they'll appear here.
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Your Applications</h3>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your submitted room applications
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {applications.map((application) => (
          <div key={application.id} className="px-4 py-5 sm:p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <span className="text-sm">
                    {statusIcons[application.status.toLowerCase()] || <FiClock className="text-yellow-500" />}
                  </span>
                  <h4 className="text-lg font-medium text-gray-900 truncate">
                    {application.propertyTitle || 'Untitled Property'}
                  </h4>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Applied on: {new Date(application.appliedDate).toLocaleDateString()}
                </p>
                {application.landlordName && (
                  <p className="mt-1 text-sm text-gray-500">
                    Landlord: {application.landlordName}
                  </p>
                )}
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                application.status === 'approved' ? 'bg-green-100 text-green-800' :
                application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                application.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {application.status}
              </span>
            </div>

            {application.message && (
              <div className="mt-3 bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-700">{application.message}</p>
              </div>
            )}

            <div className="mt-4 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View Details
              </button>
              {application.status === 'pending' && (
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel Application
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

ApplicationsListModal.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      propertyTitle: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'approved', 'rejected', 'cancelled']).isRequired,
      appliedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      landlordName: PropTypes.string,
      message: PropTypes.string
    })
  ),
  onClose: PropTypes.func.isRequired
};

ApplicationsListModal.defaultProps = {
  applications: []
};

export default ApplicationsListModal;