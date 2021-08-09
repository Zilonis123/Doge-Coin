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
        if (!args[0]) return message.reply('I can\'t give `nothing` to anyone! :angry:');
        const input = args[0];
        if (Number.isInteger(input)) return message.reply('You can\'t gift anything else than money!')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!user) return message.reply(`Who do i give \`${input.toLocaleLowerCase()}\`<a:${coin.name}:${coin.id}> to?`);
        if (sch.Wallet < input) return message.reply('You don\'t have enough money in your wallet.. :sob:');
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

        message.reply(`Succsesfully gifted \`${gift}\`<a:${coin.name}:${coin.id}> to ${user}!`);
    }
}