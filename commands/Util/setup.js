const { MessageEmbed } = require('discord.js');
const schema = require('../../models/server');
module.exports = {
    name: 'setup',
    aliases: ['st'],
    description: 'Set up the bot!',
    permissions: ['MANAGE_SERVER'],
    botpermissions: ['MANAGE_MESSAGES'],
    async execute(message) {
        const admin = new MessageEmbed()
            .setColor('RED')
            .setTitle('Setup | AdminOnly')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Do you want me to be AdminOnly send `yes` or `no`\n(Only people with `MANAGE_SERVER` could use me)');
        const prefi = new MessageEmbed()
            .setColor('RED')
            .setTitle('Setup | Prefix')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`What do you want the prefix to be, Send it in the chat or \`continue\`\n(default \`${process.env.PREFIX}\`)`);
        const menti = new MessageEmbed()
            .setColor('RED')
            .setTitle('Setup | Mentions')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Do you want admins to be able to make reminders mention `@everyone` or `roles`?\n`yes` or `no`\n(default `yes`)');
        const failed = new MessageEmbed()
            .setColor('RED')
            .setTitle('<:No:873477735312404491> | Failed')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('The setup has failed.. you took too long to answer!');
        const finnished = new MessageEmbed()
            .setColor('RED')
            .setTitle('<:Yes:873477735807328266> | Finished')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('The setup is finnished! You can always redo this setup!!!');

        const msg = await message.reply({ embeds: [admin] });
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('yes') || m.content.toLowerCase().includes('no'));
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
        if (!ans) return msg.edit({ embeds: [failed] });
        ans.first().delete();
        const adminOnly = ans.first().content;

        await msg.edit({ embeds: [prefi] })
        const pre = m => m.author.id === message.author.id;
        const pref = await message.channel.awaitMessages({ pre, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
        if (!pref) return msg.edit({ embeds: [failed] });
        let prefix = process.env.PREFIX;
        pref.first().delete();
        if (pref.first().content !== 'continue') {
            prefix = pref.first().content;
        }

        await msg.edit({ embeds: [menti] })
        const mentis = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
        if (!mentis) return msg.edit({ embeds: [failed] });
        const mentions = mentis.first().content;
        mentis.first().delete();

        const sch = await schema.findOne({ Guild: message.guild.id });
        if (!sch) {
            const schem = await schema.create({
                Guild: message.guild.id,
                Mentions: mentions,
                OnlyAdmins: adminOnly,
                Prefix: prefix,
            })
            schem.save();
        }
        else {
            sch.Mentions = mentions;
            sch.OnlyAdmins = adminOnly;
            sch.Prefix = prefix;
            sch.save();
        }
        msg.edit({ embeds: [finnished] })
    }
}