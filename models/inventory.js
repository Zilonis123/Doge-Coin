const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    User: String,
    Inventory: Object,
})
module.exports = mongoose.model('inventory', schema)