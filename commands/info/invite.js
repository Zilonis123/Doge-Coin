const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ['i'],
    cooldown: 5,
    async execute(message) {
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('Invite')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=873964681721679902&permissions=2349329505&scope=bot%20applications.commands) or click the button bellow');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Invite')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=873964681721679902&permissions=2349329505&scope=bot%20applications.commands'),
        )
        message.channel.send({ embeds: [embed], components: [row] });
    }
}