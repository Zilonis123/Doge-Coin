const paci = require('../../models/pacifist');
const hippy = require('../../models/resign as hippy');
const moment = require('moment');

module.exports = {
    name: 'pacifist',
    description: 'Become a hippy',
    aliases: ['hippy'],
    async execute(message, args, client) {
        const pacifi = await paci.findOne({ User: message.author.id });
        const get = client.hippy.get(message.author.id);
        const sec = moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds');
        if (get === 'on') return message.reply(`You cant become a hippy or resign as one, you can do that \`${moment().seconds(sec).fromNow()}\``)
        if (pacifi) {
            message.reply('Do you want to resign as a hippy? yes/no')
            const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('yes') || m.content.toLowerCase().includes('no'));
            const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
            if (!ans) return;
            if (ans.first().content.toLowerCase().includes('yes')) {
                pacifi.delete();
                message.reply('You are nolonger a hippy!');
                const hip = await hippy.create({
                    User: message.author.id
                });
                hip.save();
                client.hippy.set(message.author.id, 'start');
                const start = client.hippy.get(message.author.id);
                if (start === 'start' || (start !== 'on' && start !== 'off')) {
                    client.hippy.set(message.author.id, 'on');
                    function midnightTask() {
                        hip.delete();
                        client.hippy.set(message.author.id, 'off')
                    }
                    setTimeout(
                        midnightTask,
                        moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds') * 1000
                    );
                }
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
        const hippi = await hippy.create({
            User: message.author.id
        });
        hippi.save();
        client.hippy.set(message.author.id, 'start');
        const start = client.hippy.get(message.author.id);
        if (start === 'start' || (start !== 'on' && start !== 'off')) {
            client.hippy.set(message.author.id, 'on');
            function midnightTask() {
                hip.delete();
                client.hippy.set(message.author.id, 'off')
            }
            setTimeout(
                midnightTask,
                moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds') * 1000
            );
        }
        message.reply('You are a hippy now!')
    }
}