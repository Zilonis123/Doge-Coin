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
            .setDescription('Vote for me in [top.gg](https://top.gg/bot/873964681721679902/vote/) or click the button bellow\nVote for me in [RedCord](https://rcord.repl.co/bot/873964681721679902/vote) or click the button bellow');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Top.gg')
                .setURL('https://top.gg/bot/873964681721679902/vote/'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('DiscordBotList.com')
                .setURL('https://discord.gg/kRgWZXTjzt')
                .setDisabled(true),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('RedCord')
                .setURL('https://rcord.repl.co/bot/873964681721679902/vote'),
        )
        message.channel.send({ embeds: [embed], components: [row] });
    }
}