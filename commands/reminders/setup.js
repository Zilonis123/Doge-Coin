const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'setup',
    aliases: ['st'],
    description: 'Set up the bot!',
    permissions: ['MANAGE_SERVER'],
    async execute(message) {
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Setup')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Do you want me to be AdminOnly send `yes` or `no`\n(Only people with `MANAGE_SERVER` could use me)');
        await message.reply({ embeds: [embed] });
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('yes') || m.content.toLowerCase().includes('no'));
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
        if (!ans.size) return;
        if (ans.content === 'yes') {
            const adminOnly = 'yes';
        }
        else {
            const adminOnly = 'yes';
        }
    }
}