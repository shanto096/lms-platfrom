import React, { useState, useEffect } from 'react';
import CreateSchoolPage from './pages/CreateSchoolPage';
import SchoolPage from './pages/SchoolPage';
import HomePage from './pages/Home';


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [schoolId, setSchoolId] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    console.log(window.location.hostname);
    
    window.addEventListener('popstate', handlePopState);

    // URL থেকে স্কুলের আইডি এক্সট্রাক্ট করুন যদি থাকে
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length > 1 && pathParts[1].length === 24) { // MongoDB ObjectId length is 24
      setSchoolId(pathParts[1]);
    } else {
      setSchoolId(null);
      // সাবডোমেইন থেকে স্কুল খুঁজে বের করার চেষ্টা করুন
      const hostname = window.location.hostname;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
      const isVercel = hostname.endsWith('vercel.app');
      let subdomain = null;
      if (isVercel) {
        const parts = hostname.split('.');
        if (parts.length > 2) {
          subdomain = parts[0];
        }
      } else if (!isLocal && hostname.split('.').length > 1) {
        subdomain = hostname.split('.')[0];
      }
      if (subdomain) {
        // সাবডোমেইন দিয়ে ব্যাকএন্ডে রিকুয়েস্ট পাঠান
        fetch(`http://localhost:5000/api/schools/subdomain/${subdomain}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.school && data.school._id) {
              navigateTo(`/${data.school._id}`);
            }
          })
          .catch(() => {});
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // ব্রাউজারের URL পরিবর্তন করার জন্য একটি ফাংশন
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    const pathParts = path.split('/');
    if (pathParts.length > 1 && pathParts[1].length === 24) {
      setSchoolId(pathParts[1]);
    } else {
      setSchoolId(null);
    }
  };

  // রাউটিং লজিক
  let content;
  if (currentPath === '/create-school') {
    content = <CreateSchoolPage navigateTo={navigateTo} />;
  } else if (schoolId) {
    content = <SchoolPage schoolId={schoolId} navigateTo={navigateTo} />;
  } else {
    content = <HomePage navigateTo={navigateTo} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-bg-light text-text-dark font-sans">
      <div className="w-full max-w-4xl mx-auto p-5 box-border">
        <nav className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => navigateTo('/')}
            className="px-4 py-2 bg-primary text-white rounded-default hover:bg-blue-600 transition-colors duration-200"
          >
            হোম
          </button>
          <button
            onClick={() => navigateTo('/create-school')}
            className="px-4 py-2 bg-secondary text-white rounded-default hover:bg-teal-500 transition-colors duration-200"
          >
            স্কুল তৈরি করুন (অ্যাডমিন)
          </button>
        </nav>
        {content}
      </div>
    </div>
  );
}

export default App;
