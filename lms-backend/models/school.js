// / এটি স্কুলের মূল তথ্য সংরক্ষণের জন্য Mongoose Schema.
const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // স্কুলের নাম অনন্য হবে
        trim: true,
        lowercase: true // কেস-ইনসেনসিটিভ অনুসন্ধানের জন্য
    },
    // অন্যান্য সাধারণ স্কুলের তথ্য এখানে যোগ করা যেতে পারে
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true
    },
    contactPhone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('School', SchoolSchema);