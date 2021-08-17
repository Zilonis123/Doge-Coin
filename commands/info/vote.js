const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    aliases: ['topgg', 'dbl'],
    description: 'Vote for me!',
    cooldown: 5,
    async execute(message) {
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Vote')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('vote for me aka the best bot every [here](https://discord.gg/kRgWZXTjzt) or click the button bellow');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Top.gg')
                .setURL('https://top.gg/bot/873964681721679902/vote/'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('dbl.com')
                .setURL('https://discord.gg/kRgWZXTjzt')
                .setDisabled(true),
        )
        message.channel.send({ embeds: [embed], components: [row] });
    }
}