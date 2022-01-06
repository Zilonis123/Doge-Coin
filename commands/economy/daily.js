const userSchema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');
const msToTime = require('../../Utils/msToTime');
const ParseComma = require('../../Utils/ParseComma')


module.exports = {
    name: 'daily',
    description: 'Get your daily',
    aliases: ['d'],
    async execute(message, args, client) {

        // emojis
        const coin = await global.emojis('coin', message.guild.id);

        let userData;
        try {
            userData = await userSchema.findOne({ guildID: message.guild.id, User: message.author.id })
            if (!userData) userData = await userSchema.create({ User: message.author.id })
        } catch (err) {
            console.log(err)
        }

        const author = await userSchema.findOne({ User: message.author.id })
        const timestamp = author.dailyAt ? Date.now() - author.dailyAt : (86400 * 1000)

        if (timestamp < (86400 * 1000)) {
            const remaining = (86400 * 1000) - timestamp
            const time = msToTime(remaining)
                
            const waitEmbed = new MessageEmbed()
                .setColor('BLURPLE')
                .setTitle('You\'ve already claimed your daily today')
                .setDescription(`Your next daily is ready in:\n**${time}**`)
            return message.channel.send({ embeds: [waitEmbed] });
        }
        
        const broke = timestamp >= ((86400 * 1000) * 2);
        const streak = broke || author.dailyStreak + 1;
        const days = streak;
        
        // calculating reward
        const multi = await global.multiplier(message.guild, message.author.id);
        let reward = Math.floor((25 * 1000) * multi);

        if (Date.now() - author.dailyAt > ((86400 * 1000) * 2)) { 
            author.dailyStreak = 1;
            await author.save();
        } else {
            author.dailyStreak += 1;
            await author.save();
        }

        const streakBonus = Math.round((0.02 * reward) * streak);
        if (streak > 1) {
            reward = reward + streakBonus;
        }

        const successEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Daily Rewards")
            .setDescription(`**${coin}${ParseComma(reward)}** placed into your wallet ( ${multi} multiplier bonus )`)
            .setFooter(`Streak: ${days} days ( +${ParseComma(streakBonus)} )`)
            
        if (streak < 2) {
            successEmbed.setFooter(`Streak: 0 days ( +0 )`);
        }

        if (broke) {
            successEmbed.setFooter('');
        }

        author.dailyAt = Date.now();
        client.Add(message.author.id, reward)
        author.save();

        return message.channel.send({ embeds: [successEmbed] });
    }
}