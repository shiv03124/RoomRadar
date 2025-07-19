const TabButton = ({ children, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${active ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
  >
    {children}
    {count > 0 && (
      <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
        {count}
      </span>
    )}
  </button>
);

const RoomTabs = ({ activeTab, onTabChange, counts }) => (
  <div className="mb-6 border-b border-gray-200">
    <nav className="flex space-x-8">
      <TabButton 
        active={activeTab === 'pending'}
        onClick={() => onTabChange('pending')}
        count={counts.pending}
      >
        Pending
      </TabButton>
      <TabButton 
        active={activeTab === 'approved'}
        onClick={() => onTabChange('approved')}
        count={counts.approved}
      >
        Approved
      </TabButton>
      <TabButton 
        active={activeTab === 'rejected'}
        onClick={() => onTabChange('rejected')}
        count={counts.rejected}
      >
        Rejected
      </TabButton>
      <TabButton 
        active={activeTab === 'all'}
        onClick={() => onTabChange('all')}
        count={counts.all}
      >
        All Rooms
      </TabButton>
    </nav>
  </div>
);

export default RoomTabs;