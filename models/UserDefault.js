const mongoose = require('mongoose');
const UserDefaultSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    register: {
        type: Date,
    },
});

module.exports = mongoose.model('UserDefault', UserDefaultSchema);
