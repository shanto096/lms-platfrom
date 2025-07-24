import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [schoolId, setSchoolId] = useState(null);
    console.log('Current School ID:', schoolId); // Console log updated for clarity

    // একটি ডেমো স্কুলের আইডি, আপনার প্রয়োজন অনুযায়ী এটি পরিবর্তন করুন
    const demoSchoolId = '686be910dde25475ac28a559'; // আপনার ডেমো স্কুলের আসল আইডি দিন

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);

        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
        const isVercel = hostname.endsWith('vercel.app');
        let subdomain = null;

        // URL থেকে স্কুলের আইডি এক্সট্র্যাক্ট করুন যদি থাকে (যেমন: /স্কুলআইডি)
        const pathParts = window.location.pathname.split('/');
        if (pathParts.length > 1 && pathParts[1].length === 24) { // MongoDB ObjectId length is 24
            setSchoolId(pathParts[1]);
        } else if (isLocal) {
            // যদি লোকালহস্ট হয়, তাহলে ডেমো স্কুলের আইডি সেট করুন
            console.log('Running on localhost, using demo school ID.');
            setSchoolId(demoSchoolId);
        } else {
            // সাবডোমেইন থেকে স্কুল খুঁজে বের করার চেষ্টা করুন
            if (isVercel) {
                const parts = hostname.split('.');
                if (parts.length > 2) {
                    subdomain = parts[0];
                }
            } else if (hostname.split('.').length > 1) { // generic subdomain check for other environments
                subdomain = hostname.split('.')[0];
            }

            if (subdomain) {
                console.log('Fetching school by subdomain:', subdomain);
                // সাবডোমেইন দিয়ে ব্যাকএন্ডে রিকুয়েস্ট পাঠান
                fetch(`http://localhost:5000/api/schools/subdomain/${subdomain}`)
                    .then(res => res.json())
                    .then(data => {

                      
                        if (data && data.schoolId) {
                            setSchoolId(data.schoolId)
                            
                            
                        } else {
                            // স্কুল না পেলে ডেমো আইডি ব্যবহার করুন বা একটি ডিফল্ট দেখান
                            setSchoolId(demoSchoolId); // অথবা অন্য কোনো ফলব্যাক
                            console.warn(`School not found for subdomain: ${subdomain}, using demo ID.`);
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching school by subdomain:', err);
                        setSchoolId(demoSchoolId); // এরর হলেও ডেমো আইডি ব্যবহার করুন
                    });
            } else {
                // কোনো সাবডোমেইন না থাকলে ডেমো আইডি ব্যবহার করুন
                setSchoolId(demoSchoolId);
                console.warn('No subdomain found, using demo school ID.');
            }
        }

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []); // Empty dependency array means this effect runs once on mount

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

    return (
        <Router>
            <Routes>
                {/* HomePage-তে schoolId প্রপস হিসেবে পাঠানো হচ্ছে */}
                <Route path="/" element={<HomePage schoolId={schoolId} navigateTo={navigateTo} />} />

                {/* যেকোনো আইডি প্যারামিটার সহ রুটের জন্য */}
                {/* <Route path="/:schoolIdParam" element={<HomePage schoolId={schoolId} navigateTo={navigateTo} />} /> */}

                {/* 404 Page */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;