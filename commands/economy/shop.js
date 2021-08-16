const items = require('../../shopitems');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shop',
    aliases: ['market'],
    description: 'Open the shop to see all the latest products from Doge.Co',
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        if (items.length === 0) return message.reply('Return later when Doge.Co makes more products');

        const shopList = items
            .map((value, index) => {
                if (value.onShop) {
                    return `**${index+1}** | ${value.emoji} **${value.item}** - ${value.price.toLocaleString()}<a:${coin.name}:${coin.id}>\n - ${value.description} - **${value.type}**`;
                }
            }).join('\n\n')

        const page1 = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`Shop`)
            .setDescription(`${shopList}`)
        message.reply({ embeds: [page1] });
    }
}