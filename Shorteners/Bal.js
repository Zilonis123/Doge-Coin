const schema = require('../models/wallet');

module.exports = (id) => new Promise(async ful => {
    const data = await schema.findOne({ User: id });
    if (!data) return ful(0);
    ful(data);
})