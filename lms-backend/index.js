// এটি আপনার Node.js Express সার্ভারের প্রধান ফাইল।
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) এর জন্য
// const schoolRoutes = require('./routes/schoolRoutes'); // স্কুলের রাউটস ইম্পোর্ট করুন
require('dotenv').config(); // .env ফাইল থেকে এনভায়রনমেন্ট ভেরিয়েবল লোড করার জন্য

const app = express();
const PORT = process.env.PORT || 5000;

// মিডলওয়্যার
app.use(cors()); // সকল অরিজিন থেকে অনুরোধ গ্রহণ করার জন্য
app.use(express.json()); // JSON বডি পার্স করার জন্য



// রাউটস
// app.use('/api/schools', schoolRoutes);

// রুট রাউট (সাধারণত ফ্রন্টএন্ড অ্যাপ সার্ভ করার জন্য ব্যবহৃত হয়)
app.get('/', (req, res) => {
    res.send('School Management Backend API is running!');
});

// সার্ভার স্টার্ট করুন
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});