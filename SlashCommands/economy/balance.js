const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "balance",
    description: "returns a certain someones balance",
    options: [
        {
            name: 'someone',
            description: 'a someone whos balance you wanna check',
            type: 'USER',
            required: false,
        },
    ],
    type: 'CHAT_INPUT',
    async execute({ client, interaction, args }) {
        const [ someone ] = args
        let user = client.users.cache.get(someone) || interaction.user;

        

        // balance and messaging
        const balance = await client.Bal(user.id);

        const percentt = balance.Bank / balance.BankMax;
        const percent = percentt * 100

        const embed = new MessageEmbed()
            .setAuthor(`${user.username}'s balance`)
            .setColor(client.colors.discordYellow)
            .addField('Wallet', `\`${balance.Wallet.toLocaleString()}\`💵`, true)
            .addField('Bank', `\`${balance.Bank.toLocaleString()} || ${balance.BankMax.toLocaleString()}\` \`\`(${percent.toFixed(1)}%)\`\`💳`, true)
            .addField('Net worth', `\`${(balance.Bank + balance.Wallet).toLocaleString()}\`:moneybag:`, true);
        interaction.followUp({ embeds: [embed] });
    }
};
