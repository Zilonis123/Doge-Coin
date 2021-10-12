const client = require('../index.js');
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async(message) => {
    if (message.content.includes(`<@873964681721679902>`) || !message.guild) return;
    
    const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('This is all the info you should know about me! :D')
        .addField('Info', `My current prefix : ${process.env.PREFIX}\nMy current help command: ${process.env.PREFIX}help`, true);
    message.reply({ embeds: [embed] });
});
