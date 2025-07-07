// এটি স্কুলের রাউটগুলির জন্য লজিক হ্যান্ডেল করে।

const School = require("../models/school");
const SchoolInfo = require("../models/schoolInfo");

// স্কুলের নাম দ্বারা স্কুল খুঁজে বের করুন এবং আইডি ফেরত দিন
exports.findSchoolByName = async(req, res) => {
    const {
        name
    } = req.params; // URL থেকে স্কুলের নাম নিন
    try {
        const school = await School.findOne({
            name: name.toLowerCase()
        }); // কেস-ইনসেনসিটিভ অনুসন্ধানের জন্য

        if (!school) {
            return res.status(404).json({
                message: 'School not found'
            });
        }
        // স্কুল পাওয়া গেলে, স্কুলের আইডি ফেরত দিন
        res.json({
            schoolId: school._id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// আইডি দ্বারা স্কুলের বিস্তারিত তথ্য পান
exports.getSchoolById = async(req, res) => {
    const {
        id
    } = req.params; // URL থেকে স্কুলের আইডি নিন
    try {
        const school = await School.findById(id);
        if (!school) {
            return res.status(404).json({
                message: 'School not found'
            });
        }

        const schoolInfo = await SchoolInfo.findOne({
            school: id
        });
        // স্কুলের তথ্য এবং বিস্তারিত তথ্য একসাথে ফেরত দিন
        res.json({
            school,
            schoolInfo
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// নতুন স্কুল তৈরি করুন (পরীক্ষার জন্য)
exports.createSchool = async(req, res) => {
    const {
        name,
        subdomain,
        address,
        city,
        state,
        contactPhone,
        totalStudents,
        totalTeachers,

    } = req.body;

    try {
        // নতুন স্কুল তৈরি করুন
        const newSchool = new School({
            name,
            subdomain,
            address,
            city,
            state,
            contactPhone,
            totalStudents,
            totalTeachers
        });
        await newSchool.save();

        // নতুন স্কুলের জন্য SchoolInfo তৈরি করুন
        const newSchoolInfo = new SchoolInfo({
            school: newSchool._id,

            totalStudents,
            totalTeachers,
        });
        await newSchoolInfo.save();

        res.status(201).json({
            message: 'School created successfully',
            school: newSchool,
            schoolInfo: newSchoolInfo
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).json({
                message: 'School with this name or email already exists.'
            });
        }
        res.status(500).send('Server Error');
    }
};

// সাবডোমেইন দ্বারা স্কুল খুঁজে বের করুন এবং বিস্তারিত তথ্য ফেরত দিন
exports.findSchoolBySubdomain = async(req, res) => {
    const { subdomain } = req.params;
    try {
        const school = await School.findOne({ subdomain: subdomain.toLowerCase() });
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        const schoolInfo = await SchoolInfo.findOne({ school: school._id });
        res.json({ school, schoolInfo });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};