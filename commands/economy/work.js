const schema = require('../../models/wallet');
const create = require('../../wallet create');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    description: 'Work if you are bored of begging',
    cooldown: 3600,
    async execute(message, args, client) {
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const jobs = ['miner', 'footballer'];
        
        const rndom = Math.floor(Math.random() * jobs.length);
        const job = jobs[rndom];

        const text = {
            miner: [
                'I\'ve been mining for dogecoin for so long',
                'Guys Guys i found a coin!!',
                'I quit'
            ],
            footballer: [
                'MY LEG ITS ITS BROKEN',
                'WE WIN WE WIN LETS GOOO'
            ]
        }
        const type = Math.floor(Math.random() * 3);
        if (type === 2) {
            function scramble(a) {
                a = a.split("");
                for(var b = a.length - 1; 0 < b; b--) {
                    var c = Math.floor(Math.random() * (b + 1));
                    d = a[b];
                    a[b] = a[c];
                    a[c] = d
                }
                return a.join("")}

            const words = {
                miner: [
                    'dogecoin',
                    'mining',
                    'coal',
                    'rock',
                    'cave',
                    'torches',
                ],
                footballer: [
                    'ball',
                    'couch',
                    'broken',
                    'rain',
                    'goal',
                ]
            }
            const word = Math.floor(Math.random() * words[job].length);
            const msgWord = await scramble(words[job][word]);
            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(`You work as a ${job}`)
                .addField('Unscramble this :', `\`${msgWord}\``, true);
            message.reply({ embeds: [embed] })
            const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === words[job][word].toLowerCase();
            const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] }).catch((err) => {});
            if (!ans) return message.reply(`You failed! <a:${lol.name}:${lol.id}>`);
            const mony = Math.floor(Math.random() * 5000) + 15000;
            const sche = await schema.findOne({ User: message.author.id });
            if (!sche) create(message.author, mony, 0);
            if (sche) {
                sche.Wallet += mony;
                sche.save();
            }
            message.reply(`Great job, you got \`${mony}\`<a:${coin.name}:${coin.id}>`);
            return;
        }
        const random = Math.floor(Math.random() * text[job].length);
        const filter = m => m.author.id === message.author.id;
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`You work as a ${job}`)
            .addField('Retype this :', `\`${text[job][random]}\``, true);
        message.reply({ embeds: [embed] })
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] }).catch((err) => {});
        if (!ans || ans.first().content.toLowerCase() !== text[job][random].toLowerCase()) {
            const bruh = Math.floor(Math.random() * 1000) + 1;
            message.reply(`Bad work, you got \`${bruh.toLocaleString()}\`<a:${coin.name}:${coin.id}>`);
            const schem = await schema.findOne({ User: message.author.id });
            if (!schem) {
                return create(message.author, bruh, 0);
            }
            schem.Wallet += bruh;
            schem.save();
            return;
        }
        message.reply(`Good work soldier, you got \`15,000\`<a:${coin.name}:${coin.id}>`);
        const sche = await schema.findOne({ User: message.author.id });
        if (!sche) {
            return create(message.author, 15000, 0);
        }
        sche.Wallet += 15000;
        sche.save();
        
    }
}