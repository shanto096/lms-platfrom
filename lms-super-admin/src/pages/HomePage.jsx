import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-8 animate-fade-in-down">
        Welcome to Super Admin Dashboard
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl animate-fade-in">
        Manage your schools efficiently. From here, you can view existing schools,
        add new ones, and update their information.
      </p>
      <Link 
        to="/create-school"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full 
                   shadow-lg transform transition-all duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 
                   focus:ring-blue-300 focus:ring-opacity-75"
      >
        Create New School
      </Link>
    </div>
  );
}

export default HomePage; 