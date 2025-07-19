import React from 'react';

const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 z-40 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p className="text-sm text-gray-500">RoomRadar © 2025</p>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-500 hover:text-gray-700">Search</button>
          <span className="text-sm text-gray-500">END 23:27 IN 14-09-2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
