const NavItem = ({ icon, text, active = false }) => (
  <li>
    <a
      href="#"
      className={`flex items-center p-3 rounded-lg ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{text}</span>
    </a>
  </li>
);

export default NavItem;