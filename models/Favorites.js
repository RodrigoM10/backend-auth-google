const mongoose = require('mongoose');
const favsSchema = new mongoose.Schema({
    fav: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model('Favorite', favsSchema);
