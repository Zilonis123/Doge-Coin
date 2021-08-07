const { Schema, model } = require('mongoose');

const schema = new Schema({
    Guild: String,
    Channel: String,
    Mentions: String,
    OnlyAdmins: String,
})

module.exports = model('server', schema);