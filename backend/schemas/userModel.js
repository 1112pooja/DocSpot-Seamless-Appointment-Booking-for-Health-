const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone: {
        type: String,
        default: '',
    },
    isdoctor: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    notification: {
        type: Array,
        default: [],
    },
    seennotification: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
