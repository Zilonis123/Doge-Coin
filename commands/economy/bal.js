const { MessageEmbed } = require('discord.js');
const balanceema = require('../../models/wallet');
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
        
        // Balance
        const balance = await client.Bal(user.id);
        
        const embed = new MessageEmbed()
            .setAuthor(`${user.username}'s balance`)
            .setColor(client.colors.discordYellow)
            .addField('Wallet', `\`${balance.Wallet.toLocaleString()}\`💵`, true)
            .addField('Bank', `\`${balance.Bank.toLocaleString()} || ${balance.BankMax.toLocaleString()}\`💳`, true)
            .addField('Total', `\`${(balance.Bank + balance.Wallet).toLocaleString()}\`:moneybag:`, true);
        message.channel.send({ embeds:embed });
    }
}
