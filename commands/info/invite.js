const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ['i'],
    cooldown: 5,
    async execute(message) {
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Invite')
            .setDescription('You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=873122210750033920&permissions=2483285105&scope=bot%20applications.commands) or click the button bellow');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Invite')
                .author(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setURL('https://discord.com/api/oauth2/authorize?client_id=873122210750033920&permissions=2483285105&scope=bot%20applications.commands'),
        )
        message.channel.send({ embeds: [embed], components: [row] });
    }
}