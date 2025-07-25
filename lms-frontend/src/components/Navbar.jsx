import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import LoginModal from './LoginModal'; // Import LoginModal

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = (userId) => {
    console.log(`User ${userId} logged in successfully!`);
    // Here you might want to update the UI to show logged-in state,
    // e.g., change Login/Register buttons to User Profile/Logout
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name - Using Link for home */}
        <Link to="/" className="text-white text-2xl font-bold">
          MySchoolApp
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
        </div>

        {/* Auth Buttons - Still regular buttons as they might trigger a modal or API call */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  onClick={handleOpenLoginModal}>
            Login
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Register
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger Icon) - For smaller screens */}
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
};

export default Navbar;