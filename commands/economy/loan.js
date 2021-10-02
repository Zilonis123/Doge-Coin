const { MessageEmbed } = require('discord.js');
const Player = require('../../models/wallet');
const ms = require('ms');
const create = require('../../wallet create')

module.exports = {
    name: 'loan',
    description: 'You can get ANY amount of money but you have to pay it back with interest!',
    aliases: ['interest'],
    async execute(message, args, client) {
        const parameters = '`doge loan <money> <time>`'
        if (!args[0] || !args[1]) return message.reply(`Please use the correct parameters : ${parameters}`);
        if (!Number.isInteger(parseInt(args[0])) || parseInt(args[0]) < 0) return message.reply('Please enter a correct "Positive Ineteger"!')
        
        const guild = await client.guilds.cache.get('873965279665860628');
        const channel = await guild.channels.cache.get('893852129549234206');

        const check = await channel.messages.fetch();
        const find = await check.find(m => m.content.includes(message.author.id));
        
        if (find != null) return message.reply('You can\'t have multiple loans active at the same time!');
        
        const timing = args.slice(1).join(' ')
        const time = ms(timing);
        if (time > 86400000 || !Number.isInteger(time)) return message.reply('Im sorry but we cant make a loan that long!');
        
        const interest = Math.Floor((parseInt(args[0]) / 10) + parseInt(args[0]));
        await message.reply(`${message.author.username}, you are gonna be getting **${args[0]} money** and paying back **${interest} money** in ${timing}. Is that correct?`);
        const filter = m => m.author.id === message.author.id;
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] }).catch((err) => {});
        if (ans.first().content.toLowerCase().includes('no')) return message.reply('Have a nice day!');
        
        const schema = await Player.findOne({ User: message.author.id });
        if (!schema) {
            // create(message, parseInt(args[0]), 0);
        }
        else {
            // schema.Wallet += parseInt(args[0]);
            // schema.save();
        }
        channel.send(`${message.author.id} ${interest} ${args[0]} ${time}`);
        message.reply('Have a great day! And remember that we automatically take the money back!');
    }
}
