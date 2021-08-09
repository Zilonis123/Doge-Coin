const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const create = require('../../wallet create');
module.exports = {
    name: 'beg',
    description: 'Use this if you are poor as me',
    cooldown: 60,
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const Nomessages = ['Eww, another Subaru','Oh, sorry i don\'t give money to POOR people',
        'You better go away brat!', 'Sorry i spent all my mony on vbuks', 'Wat is mony', '***casually pees pants*** what?',
    'My mommy said i can\'t give mony to anyone'];
        const Yesmessages = [`Take this \`{money}\`<a:${coin.name}:${coin.id}>, you\'re ugly`, `**stutering** p-p-p-please don\'t hurt me ***Pees pants*** gives you \`{money}\`<a:${coin.name}:${coin.id}>`,
    `*Spits* \`{money}\`<a:${coin.name}:${coin.id}> *on the ground*`, `There you go stranger \`{money}\`<a:${coin.name}:${coin.id}>`];
        const random = Math.floor(Math.random() * 100) + 1;
        if (random >= 60) {
            const money = Math.floor(Math.random() * 1000) + 1;
            const num = Math.floor(Math.random() * Yesmessages.length);
            let msg = Yesmessages[num];
            msg = msg.replace('{money}', `${money}`);
            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setDescription(`${msg}`);
            message.reply({ embeds: [embed] });
            const schems = await schema.findOne({ User: message.author.id });
            if (!schems) {
                await create(message, money, 0);
                return;
            }
            schems.Wallet += money;
            schems.save();
            return;
        }
        const num = Math.floor(Math.random() * Nomessages.length);
        const msg = Nomessages[num];
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`${msg}`);
        message.reply({ embeds: [embed] });
        const schems = await schema.findOne({ User: message.author.id });
        if (!schems) {
            await create(message, 0, 0);
            return;
        }
    }
}