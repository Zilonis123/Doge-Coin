const create = require('../../wallet create');
const schema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'daily',
    aliases: ['d'],
    description: 'Get your daily money',
    cooldown: 240000,
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const sch = await schema.findOne({ User: message.author.id });
        if (!sch) {
            await create(message.author, 25000, 0);
            return message.channel.send({ embeds: [new MessageEmbed().setColor('YELLOW').setDescription(`You got \`25000\`<a:${coin.name}:${coin.id}>`).setAuthor('Daily')] });
        }
        message.channel.send({ embeds: [new MessageEmbed().setColor('YELLOW').setDescription(`You got \`25000\`<a:${coin.name}:${coin.id}>`).setAuthor('Daily')] });
        sch.Wallet += 25000,
        sch.save();
    }
}