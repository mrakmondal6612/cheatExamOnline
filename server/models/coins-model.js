const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
    coin: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    expire: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const CoinsModel = mongoose.model('coin', CoinSchema);

module.exports = CoinsModel;