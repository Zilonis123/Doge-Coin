const { MessageEmbed, WebhookClient } = require('discord.js');
module.exports = {
    name: 'suggest',
    description: 'suggest a command.. this will send a message in the support server!',
    aliases: ['suggestion'],
    async execute(message, args, client) {
        if (!args[0] || message.mentions.users.first() || message.content.includes('@everyone') || message.content.includes('@here')) return message.reply(`${message.author.username} please suggest a valid suggestion.`);
        if (args.length < 3) return message.reply('You are a fool you cant suggest something that small.. **whispers** do you know what else is small?');
        const webclient = new WebhookClient({ id: '890933789700788234', token: 'Sav6QKUBgfwZmfE2X38oQ3QvI6DuBMy_x-3-lm-s1CrLQyFQWBVjmWd1RVMe2y-JOzrr' });
        const msg = await webclient.send({
            username: message.author.tag,
            avatarURL: message.author.displayAvatarURL(),
            content: `${args.join(' ')}`,
        });

        message.reply('Succsesfully send your suggestion to the support server! You may earn a reward');
    }
}
