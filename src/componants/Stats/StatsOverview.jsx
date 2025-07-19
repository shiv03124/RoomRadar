import { FiCheck, FiClock, FiHome } from 'react-icons/fi';
import StatCard from './StatCard';

const StatsOverview = ({ pendingCount, approvedCount, totalCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <StatCard 
      title="Pending Rooms" 
      value={pendingCount} 
      icon={<FiClock className="text-yellow-500" />}
      color="bg-yellow-100"
    />
    <StatCard 
      title="Approved Rooms" 
      value={approvedCount} 
      icon={<FiCheck className="text-green-500" />}
      color="bg-green-100"
    />
    <StatCard 
      title="Total Rooms" 
      value={totalCount} 
      icon={<FiHome className="text-blue-500" />}
      color="bg-blue-100"
    />
  </div>
);

export default StatsOverview;