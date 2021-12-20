const schema = require('./models/wallet');
module.exports = create = async(author, wallet, bank, bankMax) => {
    const sch = await schema.create({
        User: author.id,
        Wallet: wallet,
        Bank: bank,
        BankMax: bankMax ? bankMax : 10000,
    });
    sch.save();
    return sch;
}