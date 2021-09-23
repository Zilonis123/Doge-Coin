const { MessageEmbed } = require('discord.js');
const create = require('../../wallet create');
const schema = require('../../models/wallet');

module.exports = {
    name: 'increase',
    aliases: ['inc'],
    description: 'Increase your banks / creditCards max campacity',
    cooldown: 10,
    async execute(message, args, client) {
        const sch = await schema.findOne({ User: message.author.id });
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        if (!sch) {
            create(message.author, 0, 0);
            return message.reply(`<a:${lol.name}:${lol.id}> You don\'t have the money to do this..`);
        }
        if (!args[0]) return message.reply('How much will you pay to extend the bank? Add it when sending the message?!!!!!!!');
        if (isNaN(args[0])) return message.reply('You cant pay anything else than money!');

        const moneyNeeded = parseInt(args[0]);
        const bank = moneyNeeded + sch.BankMax;
        if (sch.Wallet < moneyNeeded) return message.reply(`<a:${lol.name}:${lol.id}> You don\'t have \`${moneyNeeded.toLocaleString()}\`<a:${coin.name}:${coin.id}> in your wallet to do this`);

        message.reply(`Do you really want to increase your bank to ${bank.toLocaleString()} for \`${moneyNeeded.toLocaleString()}\`<a:${coin.name}:${coin.id}>?\nYes/No`);
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no');
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] }).catch((err) => {});
        if (!ans) return message.reply('Cancelling..');
        if (ans.first().content.toLowerCase() === 'no') return ans.first().reply('Canceling..')

        sch.Wallet -= moneyNeeded;
        sch.BankMax = bank;
        sch.save();

        return message.reply(`Your new Banks campacity is \`${bank.toLocaleString()}\`<a:${coin.name}:${coin.id}>! You spent \`${moneyNeeded.toLocaleString()}\`<a:${coin.name}:${coin.id}> for this!`);
    }
}
