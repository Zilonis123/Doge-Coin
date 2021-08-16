const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const create = require('../../wallet create');

module.exports = {
    name: 'guess',
    aliases: ['numberGuess'],
    description: 'Guess a number',
    cooldown: 60,
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');

        const sch = await schema.findOne({ User: message.author.id });

        function random(rand) {
            const num = Math.floor(Math.random() * rand) + 1;
            return num;
        }

        const realNum = random(1000);
        const guess = random(1000);
        function replace(num) {
            let nu = '';
            const bruh = num;
            for (n of bruh) {
                nu += '#';
            }
            return nu;
        }
        message.reply(`Is \`${guess}\` bigger/exact/smaller then \`${replace(realNum)}\`?`);
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('bigger') || m.content.toLowerCase().includes('smaller') || m.content.toLowerCase().includes('exact'));
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] });
        if (!ans) return;

        const msg = ans.first().content.toLowerCase();
        if ((msg.includes('bigger') && guess > realNum) || (msg.includes('smaller') && guess < realNum) || (msg.includes('exact') && guess === realNum)) {
            const money = random(10000);
            if (!sch) create(message.author, money, 0);
            else {
               sch.Wallet += money;
                sch.save();
            }
            return message.reply(`You got \`${money}\`<a:${coin.name}:${coin.id}> for guessing right!`);
        }
        else {
            return message.reply(`Incorrect, the number was \`${realNum}\``);
        } 
    }
}