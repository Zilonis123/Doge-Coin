const { Schema, model } = require('mongoose');

const schema = new Schema({
    Guild: String,
    Mentions: String,
    OnlyAdmins: String,
    Prefix: String,
})

module.exports = model('server', schema);