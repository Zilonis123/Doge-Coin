const { MessageEmbed } = require('discord.js');
const Player = require('../../modules/wallet');
const ms = require('ms');

module.exports = {
    name: 'loan',
    description: 'You can get ANY amount of money but you have to pay it back with interest!',
    aliases: ['interest'],
    async execute(message, args client) {
        const parameters = '`doge loan <money> <time>`'
        if (!args[0] || !args[1]) return message.reply(`Please use the correct parameters : ${parameters}`);
        if (!Number.isInteger(args[0]) || parseInt(args[0]) < 0) return message.reply('Please enter a correct "Positive Ineteger"!')
        
        const guild = await client.guilds.cache.get('873965279665860628');
        const channel = await guild.channels.cache.get('893852129549234206');

        const check = await channel.messages.fetch();
        const find = await check.find(m => m.content.includes(message.author.id));
        
        if (find != null) return message.reply('You can\'t have multiple loans active at the same time!);
        
        const timing = args.split(0).join(' ')
        const time = ms(timing);
        if (time > 86400000 || !Number.isInteger(time)) return message.reply('Im sorry but we cant make a loan that long!');
        
        const interest = parseInt(args[0]) / 10;
        await message.reply(`${message.author.username}, you are gonna be getting **${args[0]} money** and paying back **${interest} money** in ${timing}. Is that correct?`);
        
        
        channel.send(`${message.author.id} ${interest} he-getting-${args[0]}`);
    }
}
