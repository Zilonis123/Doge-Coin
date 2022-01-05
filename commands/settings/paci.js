const paci = require('../../models/pacifist');

module.exports = {
    name: 'pacifist',
    description: 'Become a hippy',
    aliases: ['hippy'],
    cooldown: 86400,
    async execute(message, args, client) {
        const pacifi = await paci.findOne({ User: message.author.id });
        if (pacifi) {
            message.reply('Do you want to resign as a hippy? yes/no')
            const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('yes') || m.content.toLowerCase().includes('no'));
            const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
            if (!ans) return;
            if (ans.first().content.toLowerCase().includes('yes')) {
                pacifi.delete();
                message.reply('You are nolonger a hippy!');
            }
            return;
        }
        message.reply('Do you want to become a hippy? yes/no')
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('yes') || m.content.toLowerCase().includes('no'));
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
        if (!ans) return;
        if (ans.first().content.toLowerCase().includes('no')) return message.reply('Ok you arent a hippy');
        const hipi = await paci.create({
            User: message.author.id
        });
        hipi.save();
        message.reply('You are a hippy now!')
    }
}
