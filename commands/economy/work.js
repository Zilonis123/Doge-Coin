const schema = require('../../models/wallet');
const createWallet = require('../../wallet create');
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
            message.reply(`Bad work, you got \`${bruh}\`<a:${coin.name}:${coin.id}>`);
            const schem = await schema.findOne({ User: message.author.id });
            if (!schem) {
                return create(message.author, bruh, 0);
            }
            schem.Wallet += bruh;
            schem.save();
            return;
        }
        message.reply(`Good work soldier, you got \`15000\`<a:${coin.name}:${coin.id}>`);
        const sche = await schema.findOne({ User: message.author.id });
        if (!sche) {
            return create(message.author, 15000, 0);
        }
        sche.Wallet += 15000;
        sche.save();
        
    }
}