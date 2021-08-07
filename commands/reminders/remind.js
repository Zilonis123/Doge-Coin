const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const schema = require('../../models/server');
module.exports = {
    name: 'remind',
    aliases: ['r'],
    description: 'Remind something',
    isReminder: true,
    async execute(message, args) {
        const schem = schema.findOne({ Guild: message.Guild.id });
        let reminder = args.slice(1).join(' ');

        let channel = message.mentions.channels.first() || message.channel;
        const dm = new MessageEmbed()
            .setColor('RED')
            .setTitle('Channel | DM')
            .setDescription('Do you want this reminder to go into your dms? `yes` or `channel`')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        const msg = await message.reply({ embeds: [dm] });
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase().includes('yes') || m.mentions.channels.first());
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
        if (!ans) return
        ans.first().delete()
        if (ans.first().content === 'yes') channel = message.author;
        else {
            channel = ans.first().mentions.channels.first();
        }
        
        let mention = message.author;
        const mentions = new MessageEmbed()
            .setColor('RED')
            .setTitle('Mention')
            .setDescription('Do you want this reminder to mention a `role` or `no`!')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        if (schem && schem.Mentions !== 'yes' && message.member.permissions.has(['MANAGE_SERVER']) || (schem && schem.Mentions !== 'no')) {
            msg.edit({ embeds: [mentions] });
            const filter = m => m.author.id === message.author.id && (m.mentions.roles.first() || m.content.toLowerCase().includes('no'));
            const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
            if (!ans) return
            ans.first().delete()
            if (ans.first().content !== 'no') mention = ans.first().mentions.roles.first();
        }
        

        let time = args[0];
        const nodurration = new MessageEmbed()
            .setColor('RED')
            .setTitle('No time')
            .setDescription('There was no time/durration provided!\n\nPlease send it in chat!')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        if (!time) {
            msg.edit({ embeds: [nodurration] });
            const filter = m => m.author.id === message.author.id;
            const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
            if (!ans) return;
            ans.first().delete()
            time = ans.first().content;
        }

        const noreminder = new MessageEmbed()
            .setColor('RED')
            .setTitle('No reminder')
            .setDescription('**There was no reminder provided!**\n\nPlease send it in chat')
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        if (!reminder) {
            msg.edit({ embeds: [noreminder] });
            const filter = m => m.author.id === message.author.id;
            const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
            if (!ans) return;
            ans.first().delete()
            reminder = ans.first().content;
        }

        const reminderset = new MessageEmbed()
            .setColor('RED')
            .setTitle('Reminder set!')
            .addField('Remind in', `${time}`, true)
            .addField('Reminder', `${reminder}`, true)
            .setDescription(`Reminder for ${message.author.tag} was set succsesfully!`)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        msg.edit({ embeds: [reminderset] });

        setTimeout(async function() {
            const remind = new MessageEmbed()
                .setColor('RED')
                .addField('Reminder :', `${reminder}`, true)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            channel.send({ content: `${mention}`, embeds: [remind] });
        }, ms(time))
    }
}