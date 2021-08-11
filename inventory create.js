const schema = require('./models/inventory');
module.exports = create = async(message, items={}) => {
    const sch = await schema.create({
        User: message.id,
        Inventory: items,
    });
    sch.save();
    return sch;
}