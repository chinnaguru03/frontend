import React from 'react';
import '../utils/Loader.css'; // Import the CSS file for styling

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
    </div>
  );
};

export default Loader;