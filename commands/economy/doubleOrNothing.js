const { MessageEmbed } = require('discord.js');
const schema = require('../../modles/wallet');

module.exports = {
    name: 'gamble',
    aliases: ['doubleOrNothing'],
    description: 'Double or nothing command',
    cooldown: 30,
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        if (!args[0]) return message.reply(`What are you going to bet? <a:${lol.name}:${lol.id}>`);
        if (isNaN(args[0])) return message.reply(`Did you think you can bet anything else then money? <a:${lol.name}:${lol.id}>`);

        const sch = await schema.findOne({ User: message.author.id });
        const betting = parseInt(args[0]);
        if (!sch || sch.Wallet < betting) return message.reply(`You dont have enough money in your wallet! <a:${lol.name}:${lol.id}>`);

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        }

        if (random()) {
            const win = betting * 2;
            message.reply(`You have won \`${win}\`<a:${coin.name}:${coin.id}>!`);
            
            sch.Wallet += win;
            sch.save();
        }
        else {
            message.reply(`Luck isnt on your side today <a:${lol.name}:${lol.id}>, you lost \`${betting}\`<a:${coin.name}:${coin.id}>`);
            sch.Wallet -= betting;
            sch.save();
        }
    }
}