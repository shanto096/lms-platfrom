// এটি স্কুলের API রাউটগুলি সংজ্ঞায়িত করে।
const express = require('express');
const { findSchoolByName, getSchoolById, createSchool, findSchoolBySubdomain, getSchoolInfoBySchoolId } = require('../controllers/schoolContorller');
const router = express.Router();
// const schoolController = require('../controllers/schoolController');



// আইডি দ্বারা স্কুলের বিস্তারিত তথ্য পাওয়ার রাউট
// উদাহরণ: GET /api/schools/:id
router.get('/:id', getSchoolById);

// নতুন স্কুল তৈরি করার রাউট (পরীক্ষার জন্য)
// উদাহরণ: POST /api/schools
router.post('/', createSchool);

// সাবডোমেইন দ্বারা স্কুল খুঁজে বের করার রাউট
// উদাহরণ: GET /api/schools/subdomain/mohadevpursorbomongola
router.get('/subdomain/:subdomain', findSchoolBySubdomain);

// স্কুল আইডি দ্বারা স্কুলের বিস্তারিত তথ্য (SchoolInfo) পাওয়ার রাউট
// উদাহরণ: GET /api/schools/info/:schoolId
router.get('/info/:schoolId', getSchoolInfoBySchoolId);

module.exports = router;