const schema = require('./models/wallet');
module.exports = create = async(message, wallet, bank, bankMax) => {
    const sch = await schema.create({
        User: message.id,
        Wallet: wallet,
        Bank: bank,
        BankMax: bankMax || 10000,
    });
    sch.save();
    return sch;
}