const inventory = require('../../models/inventory');
const items = require('../../shopitems');
const create = require('../../wallet create');
const createInv = require('../../inventory create');
const Player = require('../../models/wallet');

module.exports = {
    name: 'buy',
    description: 'Buy something from the shop!',
    aliases: ['b'],
    async execute(message, args, client) {
        if (message.author.id !== '530032883486687243') return message.reply('I\'m sorry but this command is getting fixed')
        const bruh = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577282621136907');
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        if (!args[0]) return message.reply(`What are you gonna buy <a:${lol.name}:${lol.id}>`)
        const itemToBuy = args[0].toLowerCase();
        let count = parseInt(args[1]);
        if (!Number.isInteger(count)) count = 1;

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if (!validItem) return message.reply(`That item isnt for sale <:${bruh.name}:${bruh.id}>`);

        const itemPrice = items.find((val) => (val.item.toLowerCase() === itemToBuy)).price;
        const itemEmoji = items.find((val) => (val.item.toLowerCase() === itemToBuy)).emoji;

        let userBalance = await Player.findOne({ User: message.author.id });
        if (!userBalance) {
            userBalance = await create(message.author, 0, 0);
        }
        const paying = itemPrice * count;
        if (userBalance.Wallet < paying) return message.reply(`You dont have \`${paying}\`<a:${coin.name}:${coin.id}> in your wallet! <a:${lol.name}:${lol.id}>`);

        const data = await inventory.findOne({ User: message.author.id })
        if (data) {
            const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
            if (hasItem) return message.reply(`You allready own this item! <a:${lol.name}:${lol.id}>`)
        }
        
        message.reply(`Do you really want to buy ${itemEmoji} **${itemToBuy}** for \`${paying.toLocaleString()}\`<a:${coin.name}:${coin.id}>?\nYes/No`);
        const filter = m => m.author.id === message.author.id && (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no');
        const ans = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] }).catch((err) => {});
        if (!ans) return message.reply('Cancelling..');
        if (ans.first().content.toLowerCase() === 'no') return ans.first().reply('Canceling..')
        userBalance.Wallet -= paying;
        userBalance.save();
        if (!data) {
            await createInv(message.author, { [itemToBuy]: count });
            return message.reply(`You succsesfully bought ${itemEmoji} **${itemToBuy}** for \`${paying.toLocaleString()}\`<a:${coin.name}:${coin.id}>`)
        }
        data.Inventory[itemToBuy] = 1;
        data.save();
        return message.reply(`You succsesfully bought ${itemEmoji} **${itemToBuy}** for \`${paying.toLocaleString()}\`<a:${coin.name}:${coin.id}>`)
        
    }
}