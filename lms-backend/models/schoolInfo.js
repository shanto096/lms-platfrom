// এটি স্কুলের বিস্তারিত তথ্য সংরক্ষণের জন্য Mongoose Schema.
const mongoose = require('mongoose');

const SchoolInfoSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', // School মডেলের সাথে রেফারেন্স
        required: true,
        unique: true // প্রতিটি স্কুলের জন্য একটিই SchoolInfo থাকবে
    },
    description: {
        type: String,
        default: '' // Default value set to empty string
    },
    principalName: {
        type: String,
        default: '' // Default value set to empty string
    },
    establishedDate: {
        type: Date // No default, as it's a specific date
    },
    totalStudents: {
        type: Number,
        default: 0 // Default value set to 0
    },
    totalTeachers: {
        type: Number,
        default: 0 // Default value set to 0
    },
    // LMS সম্পর্কিত তথ্য এখানে যোগ করা যেতে পারে
    lmsEnabled: {
        type: Boolean,
        default: false
    },
    lmsUrl: {
        type: String,
        default: '' // Default value set to empty string
    },
    // অন্যান্য বিস্তারিত তথ্য
    facilities: [{
        type: String
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SchoolInfo', SchoolInfoSchema);