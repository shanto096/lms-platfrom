// এটি হোমপেজ যেখানে ব্যবহারকারী স্কুলের নাম ইনপুট করবে।
import React, { useState } from 'react';

function HomePage({ navigateTo }) {
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!schoolName.trim()) {
      setError('অনুগ্রহ করে একটি স্কুলের নাম লিখুন।');
      setLoading(false);
      return;
    }

    try {
      // ব্যাকএন্ড API এন্ডপয়েন্ট
      const response = await fetch(`http://localhost:5000/api/schools/find/${schoolName}`);
      const data = await response.json();

      if (response.ok) {
        // স্কুল পাওয়া গেলে, স্কুলের আইডি দিয়ে নতুন URL-এ রিডাইরেক্ট করুন
        navigateTo(`/${data.schoolId}`);
      } else {
        setError(data.message || 'স্কুল খুঁজে পাওয়া যায়নি।');
      }
    } catch (err) {
      console.error('Error fetching school:', err);
      setError('সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-card-bg rounded-default shadow-custom p-8 text-center mb-5 w-full max-w-md">
        <h1 className="text-primary mb-4 text-4xl font-bold">স্কুল ম্যানেজমেন্ট সিস্টেম</h1>
        <p className="text-gray-600 mb-8 text-lg">আপনার স্কুলের তথ্য খুঁজে বের করুন</p>
        <form onSubmit={handleSearch} className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto">
          <input
            type="text"
            className="w-full p-3 border border-border-light rounded-default text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            placeholder="স্কুলের নাম লিখুন (যেমন: mohadevpursorbomongola)"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
          <button
            type="submit"
            className="w-full max-w-[200px] py-3 px-6 border-none rounded-default bg-primary text-white text-base cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:opacity-90 active:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'অনুসন্ধান করা হচ্ছে...' : 'অনুসন্ধান করুন'}
          </button>
        </form>
        {error && <p className="text-error-red mt-4 font-medium">{error}</p>}
      </div>
    </div>
  );
}

export default HomePage;