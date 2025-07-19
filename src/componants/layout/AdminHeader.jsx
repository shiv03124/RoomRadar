import { FiChevronDown, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Header = ({ email }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="relative">
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <span className="hidden md:inline-block font-medium text-gray-700">
            {email || 'Admin'}
          </span>
          <FiChevronDown className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
          >
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <FiLogOut className="mr-2" /> Logout
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;