import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-6 rounded-lg shadow-sm ${color} flex items-center justify-between`}
  >
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
    <div className="p-3 rounded-full bg-white bg-opacity-50">
      {icon}
    </div>
  </motion.div>
);

export default StatCard;