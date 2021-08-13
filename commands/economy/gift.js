const schema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');
const create = require('../../wallet create');
module.exports = {
    name: 'gift',
    aliases: ['give'],
    description: 'Gift someone money',
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const sch = await schema.findOne({ User: message.author.id });
        if (!sch) {
            await create(message, 0, 0);
            return message.reply('You dont have money!');
        }
        if (!args[0]) return message.reply('You can\'t give money to noone! :angry:');
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const input = args[1];
        const num = parseInt(args[1]);
        if (!Number.isInteger(num)) return message.reply('You can\'t gift anything else than money!');
        if (input.includes(',') || input.includes('.') || input.includes('-')) return message.reply('Remove any commas / dots / -')
        if (!user) return message.reply(`Who do i give \`${input.toLocaleLowerCase()}\`<a:${coin.name}:${coin.id}> to?`);
        if (sch.Wallet < input) return message.reply('You don\'t have enough money in your wallet.. :sob:');
        if (user.id === message.author.id) return message.reply('You can\'t give your self money!')
        const gift = parseInt(input);
        sch.Wallet -= parseInt(input);
        sch.save();
        const sche = await schema.findOne({ User: user.id });
        if (!sche) {
            const schem = await create(user, parseInt(input), 0);
        }
        else {
            sche.Wallet += parseInt(input);
            sche.save();
        }

        message.reply(`Succsesfully gifted \`${gift.toLocaleString()}\`<a:${coin.name}:${coin.id}> to ${user}!`);
    }
}