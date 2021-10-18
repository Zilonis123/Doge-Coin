const client = require('../index.js');
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async(message) => {
    if (!message.content.startsWith(`<@client.user.id>`) || !message.guild) return;
    
    const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('This is all the info you should know about me! :D')
        .addField('Prefix❗', `${process.env.PREFIX}`)
        .addField('Help cmd🆘', `${process.env.PREFIX}help`);
    message.reply({ embeds: [embed] });
});
