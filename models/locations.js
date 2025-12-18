const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    address: String,
    price: { type: Number, default: 0 },
});


module.exports = mongoose.model('Location', LocationSchema);
