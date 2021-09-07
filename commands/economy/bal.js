const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const create = require('../../wallet create');
module.exports = {
    name: 'bal',
    aliases: ['balance'],
    description: 'Check your or someone elses balance',
    cooldown: 2,
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) user = message.author;
        try {
            const schem = await schema.findOne({ User: user.id });
            if(!schem) {
                const sch = await create(message.author, 0, 0);
                const embed = new MessageEmbed()
                    .setAuthor(`${user.tag}'s balance`)
                    .setColor('YELLOW')
                    .addField('Wallet', `\`${sch.Wallet.toLocaleString()}\`💵`, true)
                    .addField('Bank', `\`${sch.Bank.toLocaleString()} || ${sch.BankMax.toLocaleString()}\`💳`, true)
                    .addField('Total', `\`${(sch.Bank + sch.Wallet).toLocaleString()}\`🤑`, true);
                return message.reply({ embeds: [embed] });
            }
            const embed = new MessageEmbed()
                .setAuthor(`${user.tag}'s balance`)
                .setColor('YELLOW')
                .addField('Wallet', `\`${schem.Wallet.toLocaleString()}\`💵`, true)
                .addField('Bank', `\`${schem.Bank.toLocaleString()} || ${schem.BankMax.toLocaleString()}\`💳`, true)
                .addField('Total', `\`${(schem.Bank + schem.Wallet).toLocaleString()}\`🤑`, true);
            message.reply({ embeds: [embed] })
        } catch(err) {
            console.log(err)
        }
        
    }
}
