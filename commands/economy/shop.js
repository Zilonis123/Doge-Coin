const items = require('../../shopitems');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { pagination } = require('reconlx');

module.exports = {
    name: 'shop',
    aliases: ['market'],
    emoji: '🏪',
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


        const lth = data.sort((a, b) => a.price - b.price);
        let lowToHigh = [];
        const htl = data.sort((a, b) => b.price - a.price);
        let highToLow = [];

        if (data.length != 0) {
            const chunks = await chunkz(lth, 5);

            for (chunk of chunks) {
                const chunking = chunk.map((v) => `- ${v.emoji} **${v.item}** - \`${v.price.toLocaleString()}\`<a:${coin.name}:${coin.id}>\n- ${v.description} - **${v.type}**`).join('\n\n');

                const embed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(chunking)
                    .setAuthor('Shop')
                
                lowToHigh.push(embed)
            }
        }
        const chunks = await chunkz(htl, 5);

            for (chunk of chunks) {
                const chunking = chunk.map((v) => `- ${v.emoji} **${v.item}** - \`${v.price.toLocaleString()}\`<a:${coin.name}:${coin.id}>\n- ${v.description} - **${v.type}**`).join('\n\n');

                const embed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(chunking)
                    .setAuthor('Shop')
                
                highToLow.push(embed)
            }
        
        const components = (state=false) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('shop')
                    .setPlaceholder('Please select a filter!')
                    .setDisabled(state)
                    .addOptions(
                        [
                            {
                                label: 'High To Low',
                                value: 'htl',
                                description: 'Get the shop items sorted from HIGH to LOW',
                                emoji: '⬆',
                            },
                            {
                                label: 'Low To High',
                                value: 'lth',
                                description: 'Get the shop items sorted from LOW to HIGH',
                                emoji: '⬇',
                            }
                        ]
                    )
            )
        ];
        const initalMessage = await message.reply({ content: 'Please choose a shop filter from bellow!', components: components(false) });
        
        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 30000,
        });
        
        collector.on('collect', (interaction) => {
            if (interaction.value == 'htl') {
                initalMessage.delete();
                pagination({
                    message: message,
                    embeds: highToLow,
                    time: 30000,
                    fastSkip: true,
                });
                return;
            }
            pagination({
                message: message,
                embeds: lowToHigh,
                time: 30000,
                fastSkip: true,
            });
        });
    }
}
function chunkz (arr, size){
    let array = [];
    for (let i = 0; i < arr.length; i += size){
        array.push(arr.slice(i, i + size))
    }
    return array;
}
