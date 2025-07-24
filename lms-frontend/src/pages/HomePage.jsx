// এটি স্কুলের বিস্তারিত তথ্য প্রদর্শন করে।
import React, { useState, useEffect } from 'react';
import SchoolDisplay from '../components/SchoolDisplay';
import Header from '../components/home/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function SchoolPage({ schoolId}) {
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
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar/>
      <Header schoolName={schoolData.school.name} subtitle={schoolData.school.description} imageUrl={schoolData.school.imageUrl} />
      <div className="bg-card-bg rounded-default shadow-custom p-8 text-center w-full max-w-md">
        <h1 className="text-primary mb-4 text-3xl font-bold">স্কুলের বিস্তারিত তথ্য</h1>
        {schoolData && <SchoolDisplay school={schoolData.school} schoolInfo={schoolData.schoolInfo} />}
      
      </div>
       <Footer/>
    </div>
  );
}

export default SchoolPage;
