const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_db';
        const MONGODB_URI = `mongodb+srv://shanto:KBxonGmFbMAW3scq@cluster0.gpxrhvy.mongodb.net/?retryWrites=true&w=majority&appName=LMS`;
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB successfully connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // অ্যাপ্লিকেশন বন্ধ করুন যদি কানেকশন ব্যর্থ হয়
    }
};

module.exports = connectDB;