// এটি স্কুলের বিস্তারিত তথ্য সংরক্ষণের জন্য Mongoose Schema.
const mongoose = require('mongoose');

const SchoolInfoSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', // School মডেলের সাথে রেফারেন্স
        required: true,
        unique: true // প্রতিটি স্কুলের জন্য একটিই SchoolInfo থাকবে
    },

    totalStudents: {
        type: Number,
        default: 0 // Default value set to 0
    },
    totalTeachers: {
        type: Number,
        default: 0 // Default value set to 0
    },


    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SchoolInfo', SchoolInfoSchema);