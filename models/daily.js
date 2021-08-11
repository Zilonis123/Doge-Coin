const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    User: String,
})
module.exports = mongoose.model('daily', schema)