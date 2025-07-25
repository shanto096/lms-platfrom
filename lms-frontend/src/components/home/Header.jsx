import React from 'react';
const Header = ({ schoolInfo }) => {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side - Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">{schoolInfo.schoolName}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {schoolInfo.address}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            {schoolInfo.schoolDescription}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
            Learn More
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1">
          <img
              src={schoolInfo.headerImage}
            alt="School"
            className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
