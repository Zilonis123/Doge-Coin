const schema = require('../../models/inventory');
const create = require('../../inventory create');
const items = require('../../shopitems');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: 'Open your inventory',
    async execute(message, args, client) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const lol = await global.emojis('lol');
        if (!user) user = message.author;
        const player = await schema.findOne({ User: user.id });
        if (!player) {
            return message.reply(`${user.tag} doesn't have an inventory, what a looser! ${lol}`);
        }
        const mappedData = Object.keys(player.Inventory).map((key) => {
            if (player.Inventory[key] === 0 || isNaN(player.Inventory[key])) return;
            const itemName = items.find((val) => (val.item.toLowerCase().includes(key)));
            const itemDescription = items.find((val) => (val.item.toLowerCase().includes(key))).description;
            const itemPower = items.find((val) => (val.item.toLowerCase().includes(key))).type;
            const emoji = items.find((val) => (val.item.toLowerCase().includes(key))).emoji;
            return `${emoji} **${itemName.item}** - ${player.Inventory[key].toLocaleString()}\n- ${itemDescription} - **${itemPower}**`
        }).join('\n');
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${user.username}'s Inventory`)
            .addField('Items :', `${mappedData}`);
        message.reply({ embeds: [embed] });
    }
}
