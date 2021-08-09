const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    User: String,
    Wallet: Number,
    Bank: Number,
    BankMax: Number,
})
module.exports = mongoose.model('balance', schema)