const mongoose = require('mongoose');
const PetitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    nameAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    phoneAuthor: {
        type: Number,
        required: true,
        trim: true,
    },
    emailAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    register: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Petition', PetitionSchema);
