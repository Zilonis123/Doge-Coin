const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const create = require('../../wallet create');

module.exports = {
    name: 'guess',
    aliases: ['numberGuess'],
    description: 'Guess a number',
    cooldown: 60,
    async execute(message, args, client) {
        const coin = await global.emojis('coin', message.guild.id);
        const lol = await global.emojis('lol', message.guild.id);

        const sch = await schema.findOne({ User: message.author.id });

        function random(rand) {
            const num = Math.floor(Math.random() * rand) + 1;
            return num;
        }

        const realNum = random(1000);
        const guess = random(1000);
        function replace(num) {
            let nu = '';
            const bruh = `${num}`;
            for (n of bruh) {
                nu += '#';
            }
            return nu;
        }
        message.reply(`Is \`${guess}\` bigger/exact/smaller than \`${replace(realNum)}\`?`);
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('bigger') || m.content.toLowerCase().includes('smaller') || m.content.toLowerCase().includes('exact'));
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] });
        if (!ans) return;

        const msg = ans.first().content.toLowerCase();
        if ((msg.includes('bigger') && guess > realNum) || (msg.includes('smaller') && guess < realNum) || (msg.includes('exact') && guess === realNum)) {
            const multiplier = await global.multiplier(message.guild, message.author.id);
            const money = Math.floor(random(10000) * multiplier);
            if (!sch) create(message.author, money, 0);
            else {
               sch.Wallet += money;
                sch.save();
            }
            return message.reply(`You got \`${money}\`${coin} (**${multiplier}x multiplier**) for guessing right!`);
        }
        else {
            return message.reply(`Incorrect, the hidden number was \`${realNum}\`${lol}${lol}`);
        } 
    }
}
