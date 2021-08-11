const schema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');
const create = require('../../wallet create');
module.exports = {
    name: 'with',
    aliases: ['withdraw'],
    description: 'withdraw your money from your bank',
    async execute(message, args, client) {
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const lmfao = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577308927811594');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const sch = await schema.findOne({ User: message.author.id });
        if (!sch) {
            await create(message, 0, 0);
            return message.reply(`You dont have money in your bank!<a:${lmfao.name}:${lmfao.id}><a:${lmfao.name}:${lmfao.id}>`);
        }
        if (!args[0]) return message.reply(`I cant take out \`nothing\` out of your bank! <a:${lmfao.name}:${lmfao.id}>`);
        const input = args[0];
        const number = parseInt(args[0])
        if (!Number.isInteger(number) && input.toLowerCase() !== 'all' && input.toLowerCase() !== 'max') return message.reply(`I cant take out \`${input}\` from your bank.. its not a number`);
        if (input.includes(',') || input.includes('.')) return message.reply('Please remove any commas or dots!');
        if (input.toLowerCase() === 'max' || input.toLowerCase() === 'all') {
            const all = sch.Wallet + sch.Bank;
            const lol = sch.Bank;
            sch.Bank = 0;
            sch.Wallet = all;
            sch.save();
            return message.reply(`Succsesfully withdrawed \`${lol}\`<a:${coin.name}:${coin.id}> from your bank!`);
        }
        if (sch.Bank < input) return message.reply(`You don\'t have enough money in your bank.. <a:${lol.name}:${lol.id}>`);
        const bank = sch.Bank - parseInt(input);
        sch.Bank = bank;
        sch.Wallet = sch.Wallet + parseInt(input);
        sch.save();
        message.reply(`Succsesfully withdrawed \`${input}\`<a:${coin.name}:${coin.id}> from your bank!`);
    }
}