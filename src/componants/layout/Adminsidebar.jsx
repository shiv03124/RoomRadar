import { FiHome, FiUsers, FiSettings, FiPieChart } from 'react-icons/fi';
import NavItem from './Adminnavitem';

const Sidebar = () => (
  <div className="w-64 bg-white shadow-md">
    <div className="p-4 border-b border-gray-200">
      <h1 className="text-xl font-bold text-blue-600 flex items-center">
        <FiPieChart className="mr-2" />
        RoomRadar
      </h1>
    </div>
    <nav className="p-4">
      <ul className="space-y-2">
        <NavItem icon={<FiHome />} text="Dashboard" active />
        <NavItem icon={<FiUsers />} text="Users" />
        <NavItem icon={<FiSettings />} text="Settings" />
      </ul>
    </nav>
  </div>
);

export default Sidebar;