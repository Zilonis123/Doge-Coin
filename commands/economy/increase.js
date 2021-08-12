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

        const moneyNeeded = sch.BankMax * 2;
        if (sch.Wallet < moneyNeeded) return message.reply(`<a:${lol.name}:${lol.id}> You don\'t have \`${moneyNeeded.toLocaleString()}\`<a:${coin.name}:${coin.id}> in your wallet to do this`);

        sch.Wallet -= moneyNeeded;
        sch.BankMax = moneyNeeded;
        sch.save();

        return message.reply(`Your new Banks campacity is \`${moneyNeeded}\`<a:${coin.name}:${coin.id}>! You spent \`${moneyNeeded}\`<a:${coin.name}:${coin.id}> for this!`);
    }
}