import React, { useState, useEffect } from 'react';


import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [schoolId, setSchoolId] = useState(null);
  console.log('schoolId',schoolId);
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    console.log(window.location.hostname);
    
    window.addEventListener('popstate', handlePopState);

    // URL থেকে স্কুলের আইডি এক্সট্রাক্ট করুন যদি থাকে
    const pathParts = window.location.pathname.split('/');
    console.log('pathParts',pathParts);
    
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
        console.log('subdomain',subdomain);
        
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
    console.log(path);
    setCurrentPath(path);
    const pathParts = path.split('/');
    if (pathParts.length > 1 && pathParts[1].length === 24) {
      setSchoolId(pathParts[1]);
    } else {
      setSchoolId(null);
    }
  };
  const sch='686be910dde25475ac28a559'
  // রাউটিং লজিক
 
  return (
    <Router>
      <Routes>
        {/* Exact path for the home page */}
        <Route path="/" element={<HomePage schoolId={sch} navigateTo={navigateTo}/>} />

          {/* Route for the about page */}

          {/* Route for the contact page */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}

          {/* Catch-all route for any undefined paths (404 Page) */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
   
  );
}

export default App;

   
   
 
