const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    aliases: ['h'],
    async execute(message) {
        const help = new MessageEmbed()
            .setColor('RED')
            .setTitle('Help')
            .setDescription('Here are all my commands..')
            .addField('Info/Utility', '`invite` - Invite the bot\n`help` - Opens this window\n`setup` - Setup the bot', true)
            .addField('Reminders', '`Remind` - Reminds you of something', true)
            .addField('Links', '[invite](https://discord.com/api/oauth2/authorize?client_id=873122210750033920&permissions=2483285105&scope=bot%20applications.commands) | [Support](https://discord.gg/gqtyeA3VDx)', true);
        message.reply({ embeds: [help] })
    }
}