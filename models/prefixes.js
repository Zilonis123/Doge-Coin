const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Server: String,
    Prefix: String
})
module.exports = mongoose.model('prefixes', schema)