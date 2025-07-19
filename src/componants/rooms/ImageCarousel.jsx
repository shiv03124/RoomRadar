import React, { useState } from 'react';

const ImageCarousel = ({ images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }
  
  return (
    <div className="mb-4 relative">
      <div className="relative">
        {/* Main Image */}
        <div className="overflow-hidden rounded-lg">
          <img 
            src={images[currentImageIndex]} 
            alt={`Room ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover transition-opacity duration-300"
          />
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(prev => 
                  prev === 0 ? images.length - 1 : prev - 1
                );
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              &lt;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(prev => 
                  prev === images.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              &gt;
            </button>
          </>
        )}
        
        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center mt-2 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === index 
                    ? 'bg-indigo-600 w-4' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;