const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const pacis = require('../../models/pacifist');

module.exports = {
    name: 'rob',
    aliases: ['steal'],
    description: 'Steal someones cash',
    cooldown: 60,
    async execute(message, args, client) {
        const paci = await pacis.findOne({ User: message.author.id })
        if (paci) return message.reply('You are in pacifist👨‍🦳 mode you cant rob anyone!')
        const sch = await schema.findOne({ User: message.author.id });
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        if (!sch || sch.Wallet < 1000) return message.reply(`You need to have atleast \`1000\`<a:${coin.name}:${coin.id}> in your wallet!`);
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user || user.id === message.author.id) return message.reply(`<a:${lol.name}:${lol.id}> What are you gonna rob?`);
        const pacic = await pacis.findOne({ User: user.id })
        if (pacic) return message.reply(`You can\'t rob ${user.username} because they are a hippy!`);

        const userSch = await schema.findOne({ User: user.id });
        if (!userSch || userSch.Wallet === 0) return message.reply(`<a:${lol.name}:${lol.id}> That user has no money in their wallet!`);

        const rand = Math.floor(Math.random() * 100) + 1;
        if (rand < 50) {
            sch.Wallet -= 1000;
            userSch.Wallet += 1000;
            sch.save();
            userSch.save();
            return message.reply(`<a:${lol.name}:${lol.id}> You gave ${user} \`1000\`<a:${coin.name}:${coin.id}>`);
        }
        const m = userSch.Wallet / 2
        const money = Math.floor(Math.random() * m) + 1;
        let msg = '';
        if (money < m / 5) msg = `You stole a super 💲tiny propotion \`${money}\`<a:${coin.name}:${coin.id}>`;
        if (money > m / 3) msg = `You stole a 💰LARGE propotion \`${money}\`<a:${coin.name}:${coin.id}>`;
        if (money > m / 2) msg = `You stole a 💰💰💰SUPER LARGE propotion \`${money}\`<a:${coin.name}:${coin.id}>`;
        sch.Wallet += money;
        userSch.Wallet -= money;
        sch.save();
        userSch.save();
        message.reply(`${msg}`);
    }
}