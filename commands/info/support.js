const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    aliases: ['comunity', 'server'],
    description: 'Get the invite to the support/community server',
    cooldown: 5,
    async execute(message) {
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Support/Community')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Need support, want to chat with cool people join [here](https://discord.gg/kRgWZXTjzt) or click the button bellow');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Support/Community')
                .setURL('https://discord.gg/kRgWZXTjzt'),
        )
        message.channel.send({ embeds: [embed], components: [row] });
    }
}