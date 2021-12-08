const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const create = require('../../wallet create');
module.exports = {
    name: 'bal',
    aliases: ['balance'],
    description: 'Check your or someone elses balance',
    cooldown: 5,
    voteOnly: true,
    async execute(message, args, client) {
        let user = message.mentions.users.first();
        if (!user) user = await message.guild.members.cache.get(args[0]);
        if (!user) user = message.author;
        id = user;
        user = user.username;
        try {
            const schem = await schema.findOne({ User: id.id });
            if(!schem) {
                const sch = await create(id, 0, 0);
                const embed = new MessageEmbed()
                    .setAuthor(`${user}'s balance`)
                    .setColor('YELLOW')
                    .addField('Wallet', `\`${sch.Wallet.toLocaleString()}\`💵`, true)
                    .addField('Bank', `\`${sch.Bank.toLocaleString()} || ${sch.BankMax.toLocaleString()}\`💳`, true)
                    .addField('Total', `\`${(sch.Bank + sch.Wallet).toLocaleString()}\`:moneybag:`, true);
                return message.reply({ embeds: [embed] });
            }
            const embed = new MessageEmbed()
                .setAuthor(`${user}'s balance`)
                .setColor('YELLOW')
                .addField('Wallet', `\`${schem.Wallet.toLocaleString()}\`💵`, true)
                .addField('Bank', `\`${schem.Bank.toLocaleString()} || ${schem.BankMax.toLocaleString()}\`💳`, true)
                .addField('Total', `\`${(schem.Bank + schem.Wallet).toLocaleString()}\`:moneybag:`, true);
            message.reply({ embeds: [embed] })
        } catch(err) {
            console.log(err)
        }
        
    }
}
