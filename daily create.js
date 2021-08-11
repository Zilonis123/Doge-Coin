const schema = require('./models/daily');
module.exports = create = async(message, wallet, bank) => {
    const sch = await schema.create({
        User: message.id,
    });
    sch.save();
    return sch;
}