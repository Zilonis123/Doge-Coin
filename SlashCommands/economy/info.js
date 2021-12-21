const { MessageEmbed, Client, CommandInteraction } = require('discord.js');
const shopitems = require('../../shopitems');

module.exports = {
    name: 'stats',
    description: 'get someones stats',
    userPermissions: [''],
    options: [
        {
            name: 'person',
            description: "a person who's data you are checking",
            type: 'USER',
            required: false
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute({ interaction, args, client }) {
        let [person] = args;
        if (!person) person = interaction.user;
        else person = client.users.cache.get(person);

        let balance = await client.Bal(person.id);
        if (!balance) balance = {User: person.id,Wallet:0, Bank: 0, BankMax: 10000};
        let inventory = await client.Inventory(person.id);

        const hasVoted = await client.Vote(person.id);
        const {cooldowns} = client;

        const mappedData = Object.keys(inventory).map((key) => {
            if (inventory[key] > 0 && !isNaN(inventory[key])) {
                const item = shopitems.find(val => val.item.toLowerCase() === key);
                return `${item.emoji} **${item.item}** - \`${inventory[key]}\`\n`
            }
        }).join('');

        const data = [];
        const guild = client.guilds.cache.get(interaction.guild.id);
        await guild.members.cache.forEach(async(m) => {
            if (!m.bot) data.push(m.id);
        });

        const balances = [];
        for (id of data) {
            const bal = await client.Bal(id);
            if (!bal || bal.Wallet < 1) continue;
            balances.push(bal);
        }

        const sorted = balances.sort((a, b) => b.Wallet - a.Wallet);
        const place = sorted.findIndex(element => element["User"] === person.id) + 1;

        cldwn = cooldowns.get("daily")
        if (!person.bot && cldwn) cldwn = cldwn.has(person.id);
        else cldwn = false;
        

        const newEmbed = new MessageEmbed()
            .setColor(client.colors.discordYellow)
            .setTitle(`${person.username}'s stats${person.bot ? ' **BOT**' : ''}`)
            .setDescription(`Theese are all ${person.username}'s info and stats`)
            .addFields(
                { name: 'Wallet', value: `\`${balance.Wallet.toLocaleString()}\`💵`, inline: true },
                { name: 'Bank', value: `\`${balance.Bank.toLocaleString()} || ${balance.BankMax.toLocaleString()}\`💳`, inline: true },
                { name: 'Net Worth', value: `\`${(balance.Wallet + balance.Bank).toLocaleString()}\`:moneybag:`, inline: true },
                { name: `Inventory`, value: `${mappedData ? mappedData : 'No inventory!!!!'}`, inline: false },
                { name: `Daily collected?`, value: `${cldwn ? 'Collected!': '__Not collected!__'}`, inline: true },
                { name: `Has voted?`, value: `${hasVoted ? 'Yes!': '__Has not voted!__'}`, inline: true },
                { name: `Place in ${interaction.guild.name}'s leaderboard`, value: `${place === 0 ? "Isn't in the leaderboard" : `${place}${place === 1 ? '🥇': `${place === 2 ? '🥈' : '🏆'}`}`}`, inline: true },
            )
            .setThumbnail(interaction.guild.iconURL())
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL())
            .setTimestamp();
        interaction.followUp({ embeds: [newEmbed] })
    },
};
