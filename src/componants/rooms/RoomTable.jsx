import { motion } from 'framer-motion';
import { FiCheck, FiX, FiClock, FiHome } from 'react-icons/fi';

const getStatusIcon = (status) => {
  switch (status) {
    case 'APPROVED': return <FiCheck className="text-green-500" />;
    case 'REJECTED': return <FiX className="text-red-500" />;
    default: return <FiClock className="text-yellow-500" />;
  }
};

const RoomTable = ({ rooms, onStatusChange }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rooms.map((room) => (
          <motion.tr 
            key={room.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="hover:bg-gray-50"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiHome className="text-blue-500" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{room.title}</div>
                  <div className="text-sm text-gray-500">ID: {room.id}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{room.user?.email || 'N/A'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">${room.price || '0'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {getStatusIcon(room.status)}
                <span className="ml-2 text-sm text-gray-900 capitalize">{room.status.toLowerCase()}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <select
                value={room.status}
                onChange={(e) => onStatusChange(room.id, e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RoomTable;