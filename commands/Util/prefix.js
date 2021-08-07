const { MessageEmbed } = require('discord.js')
const schema = require('../../models/server');
module.exports = {
    name: 'prefix',
    aliases: ['p'],
    description: 'Change the prefix',
    permissions: ['MANAGE_SERVER'],
    async execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('RED')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Prefix')
            .setDescription('Please send the prefix in chat !');
        const failed = new MessageEmbed()
            .setColor('RED')
            .setTitle('<:No:873477735312404491> | Failed')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You took too long to answer !');
        const msg = await message.reply({ embeds: [embed] });
        const filter = m => m.author.id === message.author.id ;
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
        if (!ans) return msg.edit({ embeds: [failed] });
        ans.first().delete();
        const finnished = new MessageEmbed()
            .setColor('RED')
            .setTitle('<:Yes:873477735807328266> | Finished')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`The prefix has been set to **${ans.first().content}**`);
        await msg.edit({ embeds: [finnished] });
        const sch = await schema.findOne({ Guild: message.guild.id });
        if (sch) {
            sch.Prefix = ans.first().content;
            sch.save();
            return;
        }
        const schems = await schema.create({
            Guild: message.guild.id,
            Mentions: 'yes',
            OnlyAdmins: 'no',
            Prefix: ans.first().content,
        })
        schems.save();
    }
}