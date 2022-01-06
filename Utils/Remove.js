const schema = require('../models/wallet');

module.exports = function (id , coins) {
    schema.findOne({ User: id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.wallet -= coins;
        }
        else {
            new schema({ User: id, Wallet: -coins, Bank: 0, BankMax: 10000 }).save();
        }
        data.save();
    });
}