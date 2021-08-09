const schema = require('./models/wallet');
module.exports = create = async(message, wallet, bank) => {
    const sch = await schema.create({
        User: message.id,
        Wallet: wallet,
        Bank: bank,
        BankMax: 10000,
    });
    sch.save();
    return sch;
}