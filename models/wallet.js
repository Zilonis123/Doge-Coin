const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    User: String,
    Wallet: Number,
    Bank: Number,
    BankMax: Number,
    dailyAt: { type: Number, default: 0, required: true },
    dailyStreak: { type: Number, default: 0, required: true },
})
module.exports = mongoose.model('balance', schema)