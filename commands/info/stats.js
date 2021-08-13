const { MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'stats',
    cooldown: 5,
    description: 'See the bots stats',
    async execute(message, args, client) {
        let m = 0;
        client.guilds.cache.forEach(g => m += g.memberCount);
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Stats')
            .addField('Loyal members', `${m}`, true)
            .addField('Loyal servers', `${client.guilds.cache.size}`, true)
            .addField('I was created', `${moment(client.user.createdAt).fromNow()}`, true);
        message.reply({ embeds: [embed] });
    }
}