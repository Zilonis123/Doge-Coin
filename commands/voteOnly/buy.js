const inventory = require('../../models/inventory');
const items = require('../../shopitems');
const create = require('../../wallet create');
const Player = require('../../models/wallet');
const { user } = require('../..');

module.exports = {
    name: 'buy',
    description: 'Buy something from the shop!',
    aliases: ['b'],
    async execute(message, args, client) {
        const bruh = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577282621136907');
        const lol = await global.emojis('lol', message.guild.id);
        const coin = await global.emojis('coin', message.guild.id);
        if (!args[0]) return message.reply(`What are you gonna buy ${lol}`)
        let itemToBuy = args[0].toLowerCase();
        let count = parseInt(args[1]);
        if (!Number.isInteger(count)) count = 1;
        // Check if item exists
        const itemName = items.find((val) => (val.item.toLowerCase().includes(itemToBuy)));
        if (!itemName || !itemName.onShop) return message.reply(`That item isnt for sale <:${bruh.name}:${bruh.id}>`);
        // Require the items
        const validItem = items.find((val) => val.item.toLowerCase().includes(itemToBuy)).onShop;
        const itemPrice = items.find((val) => (val.item.toLowerCase().includes(itemToBuy))).price;
        const itemEmoji = items.find((val) => (val.item.toLowerCase().includes(itemToBuy))).emoji;
        inventory.findOne({ User: message.author.id }, async(err, data) => {
        let userBalance = await Player.findOne({ User: message.author.id });
        if (!userBalance) {
            userBalance = await create(message.author, 0, 0);
        }
        const paying = itemPrice * count;
        inventory.findOne({ User: message.author.id }, async(err, data) => {
        })       
        { 
            if (data) {
                if ((itemName.item === 'clock' && (count > 1 || data.Inventory['clock'] > 0)) || (itemName.item === 'police car' && (count > 99 || data.Inventory['police car'] >= 99)) || count > 999) {
                     return message.reply(`You can't own more \`${itemName.item}'s\` than you allready own! Or you cant buy that much`);
                }
            }
        }
        
        if (userBalance.Wallet < paying) return message.reply(`You dont have \`${paying}\`${coin} in your wallet! ${lol}`);
        message.reply(`Do you really want to buy **${count}** ${itemEmoji} **${itemName.item}** for \`${paying.toLocaleString()}\`${coin}?\nYes/No`);
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no');
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] }).catch((err) => {});
        if (!ans) return message.reply('Cancelling..');
        if (ans.first().content.toLowerCase() === 'no') return ans.first().reply('Canceling the request..')
        userBalance.Wallet -= paying;
        inventory.findOne({ User: message.author.id }, async(err, data) => {})
        {
            if (data) {
            const hasItem = Object.keys(data.Inventory).includes(itemName.item);
            if (!hasItem) {
                data.Inventory[itemName.item] = count;
            }
            else {
                data.Inventory[itemName.item] += count;
            }
            await inventory.findOneAndUpdate({ User: message.author.id }, data).catch(err => {message.reply('something went wrong')})
        }
        else {
            new inventory({
                User: message.author.id,
                Inventory: {
                    [itemName.item]: 1
                },
            }).save();
        }

        };
        userBalance.save();
        message.reply(`You succsesfully bought **${count}** ${itemEmoji} **${itemName.item}** for \`${paying.toLocaleString()}\`${coin}`)
    })
    }
}
