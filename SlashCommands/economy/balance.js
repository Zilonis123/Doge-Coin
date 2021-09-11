const { MessageEmbed } = require("discord.js");
const ms = require('ms');
const schema = require('../../models/wallet');
const create = require('../../wallet create');

module.exports = {
    name: "balance",
    description: "returns a certain someones balance",
    options: [
        {
            name: 'someone',
            description: 'a someone whos balance you want to check!',
            type: 'USER',
            required: false,
        },
    ],
    type: 'CHAT_INPUT',
    async execute(client, interaction, args) {
        const [ someone ] = args
        let user = someone || interaction.user.id;
        const person = await interaction.guild.members.cache.get(someone)?.user.username || interaction.member.user.username
        try {
            const schem = await schema.findOne({ User: user });
            if(!schem) {
                const sch = {
                    Wallet: 0,
                    Bank: 0,
                    BankMax: 10000,
                };
                const embed = new MessageEmbed()
                    .setAuthor(`${person}'s balance`)
                    .setColor('YELLOW')
                    .addField('Wallet', `\`${sch.Wallet.toLocaleString()}\`💵`, true)
                    .addField('Bank', `\`${sch.Bank.toLocaleString()} || ${sch.BankMax.toLocaleString()}\`💳`, true)
                    .addField('Total', `\`${(sch.Bank + sch.Wallet).toLocaleString()}\`🤑`, true);
                return interaction.editReply({ embeds: [embed] });
            }
            const embed = new MessageEmbed()
                .setAuthor(`${person}'s balance`)
                .setColor('YELLOW')
                .addField('Wallet', `\`${schem.Wallet.toLocaleString()}\`💵`, true)
                .addField('Bank', `\`${schem.Bank.toLocaleString()} || ${schem.BankMax.toLocaleString()}\`💳`, true)
                .addField('Total', `\`${(schem.Bank + schem.Wallet).toLocaleString()}\`🤑`, true);
            interaction.editReply({ embeds: [embed] })
        } catch(err) {
            console.log(err)
        }
    }
};
