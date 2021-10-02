const items = require('../../shopitems');
const { MessageEmbed } = require('discord.js');
const { pagination } = require('reconlx');

module.exports = {
    name: 'shop',
    aliases: ['market'],
    description: 'Open the shop to see all the latest products from Doge.Co',
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        if (items.length === 0) return message.reply('Return later when Doge.Co makes more products');

        let data = []
        for (item of items) {
            if (item.onShop) {
                data.push(item);
            }
        }

        function chunkz (arr, size){
            let array = [];
            for (let i = 0; i < arr.length; i += size){
                array.push(arr.slice(i, i + size))
            }
            return array;
        }

        const sorted = data.sort((a, b) => a.price - b.price);

        if (data.length > 5) {
            const chunks = await chunkz(sorted, 5);
            let arry = [];

            for (chunk of chunks) {
                const chunking = chunk.map((v) => `- ${v.emoji} **${v.item}** - \`${v.price.toLocaleString()}\`<a:${coin.name}:${coin.id}>\n- ${v.description} - **${v.type}**`).join('\n\n');

                const embed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(chunking)
                    .setAuthor('Shop')
                
                arry.push(embed)
            }

            pagination({
                embeds: arry,
                message: message,
                time: 30000,
                fastSkip: true,
            });
        }
        else {
            const chunking = sorted.map((v) => `- ${v.emoji} **${v.item}** - \`${v.price.toLocaleString()}\`<a:${coin.name}:${coin.id}>\n- ${v.description} - **${v.type}**`).join('\n\n');

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('YELLOW')
                        .setDescription(chunking)
                        .setAuthor('Shop')
                ]
            })
        }
    }
}
