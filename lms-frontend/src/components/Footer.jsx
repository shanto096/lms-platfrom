import React from 'react';
import { Link } from 'react-router-dom'; // React Router Link ব্যবহার করার জন্য

const Footer = () => {
  const currentYear = new Date().getFullYear(); // বর্তমান বছর ডাইনামিকভাবে পাওয়ার জন্য

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start text-center md:text-left">
          {/* Company Info / Logo Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-white text-2xl font-bold mb-4">MySchoolApp</h3>
            <p className="text-sm leading-relaxed">
              আপনার স্কুলের জন্য সেরা ডিজিটাল সমাধান। আমরা শিক্ষার্থীদের এবং শিক্ষকদের জন্য একটি সহজ এবং কার্যকর প্ল্যাটফর্ম তৈরি করি।
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition duration-300 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition duration-300 text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition duration-300 text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition duration-300 text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@myschoolapp.com" className="hover:text-white transition duration-300">info@myschoolapp.com</a>
              </li>
              <li>
                <a href="tel:+8801XXXXXXXXX" className="hover:text-white transition duration-300">+880 1XXXXXXXXX</a>
              </li>
              <li>
                <span>123 School Road, City, Country</span>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/6">
            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-facebook-f text-xl"></i> {/* Font Awesome Icon */}
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-twitter text-xl"></i> {/* Font Awesome Icon */}
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-linkedin-in text-xl"></i> {/* Font Awesome Icon */}
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-instagram text-xl"></i> {/* Font Awesome Icon */}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} MySchoolApp. All rights reserved.</p>
          <p>Made with ❤️ by Your Company Name</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;