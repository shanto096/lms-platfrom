// এটি স্কুলের বিস্তারিত তথ্য সংরক্ষণের জন্য Mongoose Schema.
const mongoose = require('mongoose');

const SchoolInfoSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', // School মডেলের সাথে রেফারেন্স
        required: true,
        unique: true // প্রতিটি স্কুলের জন্য একটিই SchoolInfo থাকবে
    },
    // নতুন যোগ করা ফিল্ডস এবং তাদের ডিফল্ট ভ্যালু
    schoolName: {
        type: String,
        default: 'Unnamed School', // ডিফল্ট নাম
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    schoolTitle: {
        type: String,
        default: 'A Place of Learning and Growth', // ডিফল্ট টাইটেল
        trim: true,
        minlength: 5,
        maxlength: 200
    },
    schoolDescription: {
        type: String,
        default: 'Welcome to our school! We are committed to providing quality education and fostering a positive learning environment for all our students. Our dedicated staff and comprehensive curriculum ensure a holistic development for every child.', // ডিফল্ট ডেসক্রিপশন
        trim: true,
        minlength: 20,
        maxlength: 1000
    },
    headerImage: {
        type: String,
        default: 'https://via.placeholder.com/1500x500?text=School+Header+Image', // ডিফল্ট হেডার ইমেজ
    },
    logo: {
        type: String,
        default: 'https://via.placeholder.com/200x200?text=School+Logo', // ডিফল্ট লোগো
    },
    address: {
        type: String,
        default: 'Not Provided', // ডিফল্ট অ্যাড্রেস
        trim: true,
        maxlength: 200
    },
    city: {
        type: String,
        default: 'Not Specified', // ডিফল্ট সিটি
        trim: true,
        maxlength: 50
    },
    country: {
        type: String,
        default: 'Bangladesh', // ডিফল্ট কান্ট্রি
        trim: true,
        maxlength: 50
    },
    contactEmail: {
        type: String,
        default: 'info@example.com', // ডিফল্ট ইমেইল
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/, // ইমেইল ফরম্যাট ভ্যালিডেশন
        maxlength: 100
    },
    contactPhone: {
        type: String,
        default: '+880XXXXXXXXXX', // ডিফল্ট ফোন নম্বর
        trim: true,
        maxlength: 20
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    totalTeachers: {
        type: Number,
        default: 0
    },
    establishedYear: {
        type: Number,
        default: 2000, // একটি ডিফল্ট প্রতিষ্ঠা বছর
        min: 1800,
        max: new Date().getFullYear()
    },
    // স্বয়ংক্রিয়ভাবে যোগ হওয়া টাইমস্ট্যাম্প
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// যখনই ডকুমেন্ট সেভ করা হবে, `updatedAt` ফিল্ডটি স্বয়ংক্রিয়ভাবে আপডেট হবে
SchoolInfoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('SchoolInfo', SchoolInfoSchema);