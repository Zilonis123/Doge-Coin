const { MessageEmbed } = require('discord.js');
const schema = require('../../models/prefix');

module.exports = {
    name: 'prefix',
    description: 'Change or view the prefix',
    aliases: ['pref'],
    async execute(message, args, client) {
        let sch = await schema.findOne({ Guild: message.guild.id });
        if (!sch) sch = await schema.create({Guild:message.guild.id,Prefix:process.env.PREFIX+' '});
        if (!message.member.permissions.has('MANAGE_GUILD') || !args[0]) {
            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(`${message.guild.name}'s prefix`)
                .addField('Prefix :', `${sch.Prefix}`, true);
            message.reply({ embeds: [embed] });
        }
    }
}