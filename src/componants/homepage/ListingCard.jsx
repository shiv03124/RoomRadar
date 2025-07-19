// ListingCard.js
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing, hoverEffect }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/dashboard', { state: { listing } }); // Pass listing data as state
  };

  return (
    <motion.div
      whileHover={hoverEffect}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
    >
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{listing.title}</h3>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
            ${listing.price}/mo
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          {listing.beds} beds · {listing.baths} bath · {listing.sqft} sqft
        </p>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(listing.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className="text-gray-600">{listing.reviews} reviews</span>
        </div>
        <button 
          onClick={handleViewDetails}
          className="text-indigo-600 font-medium flex items-center"
        >
          View details <FaArrowRight className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default ListingCard;