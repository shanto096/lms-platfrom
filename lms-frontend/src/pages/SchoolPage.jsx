// এটি স্কুলের বিস্তারিত তথ্য প্রদর্শন করে।
import React, { useState, useEffect } from 'react';
import SchoolDisplay from '../components/SchoolDisplay';


function SchoolPage({ schoolId, navigateTo }) {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchoolData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:5000/api/schools/${schoolId}`);
        const data = await response.json();

        if (response.ok) {
          setSchoolData(data);
        } else {
          setError(data.message || 'স্কুলের তথ্য লোড করা যায়নি।');
        }
      } catch (err) {
        console.error('Error fetching school details:', err);
        setError('সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchSchoolData();
    } else {
      setError('কোন স্কুলের আইডি পাওয়া যায়নি।');
      setLoading(false);
    }
  }, [schoolId]);

  const handleBackToHome = () => {
    navigateTo('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="bg-card-bg rounded-default shadow-custom p-8 text-center w-full max-w-md">
          <p className="text-primary font-medium">তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="bg-card-bg rounded-default shadow-custom p-8 text-center w-full max-w-md">
          <p className="text-error-red">{error}</p>
          <button
            onClick={handleBackToHome}
            className="w-full max-w-[200px] py-3 px-6 border-none rounded-default bg-gray-600 text-white text-base cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:opacity-90 active:translate-y-0 mt-5"
          >
            হোমপেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-card-bg rounded-default shadow-custom p-8 text-center w-full max-w-md">
        <h1 className="text-primary mb-4 text-3xl font-bold">স্কুলের বিস্তারিত তথ্য</h1>
        {schoolData && <SchoolDisplay school={schoolData.school} schoolInfo={schoolData.schoolInfo} />}
        <button
          onClick={handleBackToHome}
          className="w-full max-w-[200px] py-3 px-6 border-none rounded-default bg-gray-600 text-white text-base cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:opacity-90 active:translate-y-0 mt-5"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    </div>
  );
}

export default SchoolPage;
