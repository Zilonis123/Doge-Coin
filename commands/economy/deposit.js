const schema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');
const create = require('../../wallet create');
module.exports = {
    name: 'dep',
    aliases: ['deposit'],
    description: 'Deposit your money into your bank',
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const sch = await schema.findOne({ User: message.author.id });
        if (!sch) {
            await create(message, 0, 0);
            return message.reply('You dont have enough money in your wallet!');
        }
        if (!args[0]) return message.reply('I cant put `nothing` into your bank! :angry:');
        const input = args[0];
        if (Number.isInteger(input) && (input.toLowerCase() !== 'all' || input.toLowerCase() !== 'max')) return message.reply(`I cant put \`${input}\` into your bank.. its not a number`);
        if (input.toLowerCase() === 'max' || input.toLowerCase() === 'all') {
            if ((sch.Wallet + sch.Bank) > sch.BankMax) return message.reply('You don\'t have enough space in your bank!');
            const all = sch.Wallet + sch.Bank;
            const lol = sch.Wallet;
            sch.Bank = all;
            sch.Wallet = 0;
            sch.save();
            return message.reply(`Succsesfully deposited \`${lol}\`<a:${coin.name}:${coin.id}> into your bank!`);
        }
        if (sch.Wallet < input) return message.reply('You don\'t have enough money in your wallet.. :sob:');
        const bank = sch.Bank + parseInt(input);
        if (sch.BankMax < bank) return message.reply('You don\'t have enough space in your bank!');
        sch.Bank = bank;
        sch.Wallet = sch.Wallet - input;
        sch.save();
        message.reply(`Succsesfully deposited \`${input}\`<a:${coin.name}:${coin.id}> into your bank!`);
    }
}