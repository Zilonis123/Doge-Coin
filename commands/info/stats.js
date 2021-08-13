const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stats',
    cooldown: 5,
    description: 'See the bots stats',
    async execute(message, args, client) {
        let m;
        client.guilds.cache.forEach(g => m += g.memberCount);
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Stats')
            .addField('Loyal members', `${m}`, true)
            .addField('Loyal servers', `${client.guilds.cache.size}`, true)
            .addField('My legal age', `${client.user.createdAt}`, true);
        message.reply({ embeds: [embed] });
    }
}