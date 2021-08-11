const schema = require('../../models/wallet');
const createWallet = require('../../wallet create');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    description: 'Work if you are bored of begging',
    async execute(message, args, client) {
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const jobs = ['miner'];
        
        if (!args[0]) return message.reply('Im sorry but \`Noone\` job is allready taken!');
        const job = args[0].toLowerCase();
        if (!jobs.includes(job)) return message.reply(`I\'m sorry but \`${job}\` job doesnt exist! <a:${coin.name}:${coin.id}>\nPlease choose between \`\`\`${jobs.join(', ')}\`\`\``);

        const text = {
            miner: [
                'I\'ve been mining for dogecoin for so long',
                'Guys Guys i found a coin!!'
            ]
        }

        
        const random = Math.floor(Math.random() * text[job].length);
        const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === text[job][random];
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`You work as a ${job}`)
            .addField('Retype this :', `${text[job][random]}`);
        message.reply({ embeds: [embed] })
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] }).catch((err) => {});
        if (!ans) {
            const coin = Math.floor(Math.random() * 1000) + 1;
            message.reply(`Bad work, you got \`${coin}\`<a:${coin.name}:${coin.id}>`);
            const schem = await schema.findOne({ User: message.author.id });
            if (!schem) {
                return create(message.author, coin, 0);
            }
            schem.Wallet += coin;
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