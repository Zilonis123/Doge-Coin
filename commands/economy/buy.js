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
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = global.emojis('coin');
        if (!args[0]) return message.reply(`What are you gonna buy <a:${lol.name}:${lol.id}>`)
        let itemToBuy = args[0].toLowerCase();
        let count = parseInt(args[1]);
        if (!Number.isInteger(count)) count = 1;
        if(itemToBuy == "grape")
        {
            itemToBuy = "grapes";
        }
        const validItem = items.find((val) => val.item.toLowerCase().includes(itemToBuy)).onShop;
        if (!validItem) return message.reply(`That item isnt for sale <:${bruh.name}:${bruh.id}>`);
        const itemPrice = items.find((val) => (val.item.toLowerCase().includes(itemToBuy))).price;
        const itemEmoji = items.find((val) => (val.item.toLowerCase().includes(itemToBuy))).emoji;
        const itemName = items.find((val) => (val.item.toLowerCase().includes(itemToBuy)));
        inventory.findOne({ User: message.author.id }, async(err, data) => {
        let userBalance = await Player.findOne({ User: message.author.id });
        if (!userBalance) {
            userBalance = await create(message.author, 0, 0);
        }
        const paying = itemPrice * count;
        inventory.findOne({ User: message.author.id }, async(err, data) => {
        })       
        { 
            if (itemName.item == "clock" && data.Inventory[itemToBuy] > 0)
        {
            return message.reply(`You already own a clock you cant buy another`);
        }
        }
        
        if (userBalance.Wallet < paying) return message.reply(`You dont have \`${paying}\`<a:${coin.name}:${coin.id}> in your wallet! <a:${lol.name}:${lol.id}>`);
        message.reply(`Do you really want to buy **${count}** ${itemEmoji} **${itemName.item}** for \`${paying.toLocaleString()}\`<a:${coin.name}:${coin.id}>?\nYes/No`);
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no');
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] }).catch((err) => {});
        if (!ans) return message.reply('Cancelling..');
        if (ans.first().content.toLowerCase() === 'no') return ans.first().reply('Canceling the request..')
        userBalance.Wallet -= paying;
        userBalance.save();
        inventory.findOne({ User: message.author.id }, async(err, data) => {})
        {
            if (data) {
            const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
            if (!hasItem) {
                data.Inventory[itemToBuy] = count;
            }
            else {
                data.Inventory[itemToBuy] += count;
            }
            console.log(data);
            await inventory.findOneAndUpdate({ User: message.author.id }, data)
        }
        else {
            new inventory({
                User: message.author.id,
                Inventory: {
                    [itemToBuy]: 1
                },
            }).save();
        }

        };
        message.reply(`You succsesfully bought **${count}** ${itemEmoji} **${itemName.item}** for \`${paying.toLocaleString()}\`<a:${coin.name}:${coin.id}>`)
    })
    }
}
