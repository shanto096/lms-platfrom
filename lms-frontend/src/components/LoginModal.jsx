import React, { useState, useEffect } from 'react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [userId, setUserId] = useState(''); // ইউজার আইডি বা ইমেইল
  const [password, setPassword] = useState(''); // পাসওয়ার্ড
  const [errorMessage, setErrorMessage] = useState(''); // এরর মেসেজ দেখানোর জন্য
  const [isLoading, setIsLoading] = useState(false); // লোডিং স্টেট

  // মডাল খোলা বা বন্ধ হলে ইনপুট ফিল্ড রিসেট করার জন্য
  useEffect(() => {
    if (!isOpen) {
      setUserId('');
      setPassword('');
      setErrorMessage('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault(); // ফর্ম সাবমিট হলে পেজ রিলোড বন্ধ করার জন্য
    setErrorMessage(''); // পূর্বের এরর মেসেজ মুছে ফেলা
    setIsLoading(true); // লোডিং শুরু

    // এখানে আপনার আসল লগইন API কল হবে
    // আপাতত একটি ডেমো লজিক ব্যবহার করা হচ্ছে
    try {
      // API কলের একটি সিমুলেশন
      const response = await new Promise(resolve => setTimeout(() => {
        if (userId === 'user' && password === 'password') {
          resolve({ success: true, message: 'লগইন সফল!' });
        } else {
          resolve({ success: false, message: 'ভুল ইউজার আইডি বা পাসওয়ার্ড।' });
        }
      }, 1500)); // 1.5 সেকেন্ডের জন্য লোডিং দেখাবে

      if (response.success) {
        // লগইন সফল হলে
        if (onLoginSuccess) {
          onLoginSuccess(userId); // প্যারেন্ট কম্পোনেন্টকে সফল লগইনের তথ্য জানানো
        }
        onClose(); // মডাল বন্ধ করা
      } else {
        // লগইন ব্যর্থ হলে
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('লগইন এরর:', error);
      setErrorMessage('লগইন করার সময় একটি সমস্যা হয়েছে।');
    } finally {
      setIsLoading(false); // লোডিং শেষ
    }
  };

  if (!isOpen) return null; // যদি মডাল খোলা না থাকে, তাহলে কিছু রেন্ডার করবে না

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50 p-4 font-inter">
      {/* মডাল কন্টেন্ট */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
        {/* ক্লোজ বাটন */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300 focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">লগইন করুন</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* ইউজার আইডি/ইমেইল ইনপুট */}
          <div>
            <label htmlFor="userId" className="block text-gray-700 text-sm font-semibold mb-2">
              ইউজার আইডি বা ইমেইল
            </label>
            <input
              type="text"
              id="userId"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="আপনার ইউজার আইডি বা ইমেইল লিখুন"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* এরর মেসেজ */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          {/* লগইন বাটন */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            disabled={isLoading} // লোডিং অবস্থায় বাটন ডিসেবল থাকবে
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'লগইন করুন'
            )}
          </button>

          {/* পাসওয়ার্ড ভুলে গেছেন? */}
          <p className="text-center text-sm text-gray-600">
            <a href="#" className="text-blue-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
