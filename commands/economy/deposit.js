const schema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');
const create = require('../../wallet create');
module.exports = {
    name: 'dep',
    aliases: ['deposit'],
    description: 'Deposit your money into your bank',
    async execute(message, args, client) {
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const lmfao = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577308927811594');
        const sch = await schema.findOne({ User: message.author.id });
        if (!sch) {
            await create(message, 0, 0);
            return message.reply(`You dont have enough money in your wallet!<a:${lmfao.name}:${lmfao.id}><a:${lmfao.name}:${lmfao.id}>`);
        }
        if (!args[0]) return message.reply('I cant put `nothing` into your bank! :angry:');
        const input = args[0];
        const number = parseInt(args[0]);
        if (!Number.isInteger(number) && input.toLowerCase() !== 'all' && input.toLowerCase() !== 'max') return message.reply(`I cant put \`${input}\` into your bank.. <a:${lmfao.name}:${lmfao.id}>`);
        if (input.includes(',') || input.includes('.')) return message.reply('Please remove any commas or dots!');
        if (input.toLowerCase() === 'max' || input.toLowerCase() === 'all') {
            if ((sch.Wallet + sch.Bank) > sch.BankMax) return message.reply('You don\'t have enough space in your bank!');
            const all = sch.Wallet + sch.Bank;
            const lol = sch.Wallet;
            sch.Bank = all;
            sch.Wallet = 0;
            sch.save();
            return message.reply(`Succsesfully deposited \`${lol}\`<a:${coin.name}:${coin.id}> into your bank!`);
        }
        if (sch.Wallet < number) return message.reply(`You don\'t have enough money in your wallet.. <a:${lol.name}:${lol.id}>`);
        const bank = sch.Bank + parseInt(input);
        if (sch.BankMax < bank) return message.reply('You don\'t have enough space in your bank!');
        sch.Bank = bank;
        sch.Wallet = sch.Wallet - input;
        sch.save();
        message.reply(`Succsesfully deposited \`${input}\`<a:${coin.name}:${coin.id}> into your bank!`);
    }
}