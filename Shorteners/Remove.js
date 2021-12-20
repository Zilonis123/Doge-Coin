const schema = require('../models/wallet');

module.exports = function (id , coins) {
    schema.findOne({ User: id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.wallet -= coins;
        }
        else {
            new schema({ User: id, wallet: -coins })
        }
        data.save();
    });
}