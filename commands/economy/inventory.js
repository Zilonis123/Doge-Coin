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
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        if (!user) user = message.author;
        const player = await schema.findOne({ User: user.id });
        if (!player) {
            return message.reply(`${user.tag} doesn't have an inventory, what a looser! <a:${lol.name}:${lol.id}>`);
        }
        const mappedData = Object.keys(player.Inventory).map((key) => {
            const itemDescription = items.find((val) => (val.item.toLowerCase() === key)).description;
            const emoji = items.find((val) => (val.item.toLowerCase() === key)).emoji;
            return `${emoji} **${key}** - ${player.Inventory[key].toLocaleString()}\n- ${itemDescription}`
        }).join('\n');
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${user.username}'s Inventory`)
            .addField('Items :', `${mappedData}`);
        message.reply({ embeds: [embed] });
    }
}