const inventory = require('../../models/inventory');
const items = require('../../shopitems');
const create = require('../../wallet create');
const Player = require('../../models/wallet');

module.exports = {
    name: 'use',
    description: 'Use an item',
    aliases: ['u'],
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        if (!args[0]) return message.reply('What are you going to use?');
        const item = args[0].toLowerCase();

        inventory.findOne({ User: message.author.id }, async(err, data) => {
            if (!data) return message.reply('You dont own this item! :thinking:');
            const hasItem = Object.keys(data.Inventory).includes(item);
            if (!hasItem || data.Inventory[item] === 0) return message.reply('You dont own this item! :thinking:');
            // Poop
            if (item === 'poop') {
                Player.findOne({ User: message.author.id }, async(err, data) => {
                    const rndm = Math.floor(Math.random() * 2);
                    let money = 0;
                    if (rndm === 1) money = Math.floor(Math.random() * 100) + 1;
                    if (!data) {
                        create(message.author, money, 0);
                    }
                    else {
                        data.Wallet += money;
                        await Player.findOneAndUpdate({ User: message.author.id }, data);
                    }
                    message.reply(`You got \`${money.toLocaleString()}\`<a:${coin.name}:${coin.id}> from diging in your shit!`)
                })
                data.Inventory[item]--;
            }
            else if (item === 'grapes') {
                Player.findOne({ User: message.author.id }, async(err, data) => {
                    const rndm = Math.floor(Math.random() * 2);
                    let bankInc = 0;
                    if (rndm === 1) bankInc = Math.floor(Math.random() * 100) + 1;
                    if (!data) {
                        create(message.author, 0, 0, bankInc);
                    }
                    else {
                        data.BankMax += bankInc;
                        await Player.findOneAndUpdate({ User: message.author.id }, data);
                    }
                    message.reply(`You increased your banks campacity by \`${bankInc.toLocaleString()}\`<a:${coin.name}:${coin.id}> from eating grapes!`)
                })
                data.Inventory[item]--;
            }
            else if (item === 'clock') {
                return message.reply('This item has been automaticaly used!');
            }
            else if (item === 'banknote') {
                Player.findOne({ User: message.author.id }, async(err, data) => {
                    let bankInc = Math.floor(Math.random() * 40000) + 80000;
                    if (!data) {
                        create(message.author, 0, 0, bankInc);
                    }
                    else {
                        data.BankMax += bankInc;
                        await Player.findOneAndUpdate({ User: message.author.id }, data);
                    }
                    message.reply(`You increased your banks campacity by \`${bankInc.toLocaleString()}\`<a:${coin.name}:${coin.id}> from your banknote!`)
                })
                data.Inventory[item]--;
            }
            else if (item.includes('loot')) {
                let banknote = Math.floor(Math.random() * 2);
                if (banknote === 1) banknote = true;
                if (banknote === 0) banknote = false;
                let money = Math.floor(Math.random() * 10000) + 50000;
                Player.findOne({ User: message.author.id }, async(err, data) => {
                    if (!data) {
                        create(message.author, money, 0);
                    }
                    else {
                        data.Wallet += money;
                        await Player.findOneAndUpdate({ User: message.author.id }, data);
                    }
                })
                let msg = `You got\n\`${money.toLocaleString()}\`<a:${coin.name}:${coin.id}>\n\n from your loot box!`;
                if (banknote) {
                    data.Inventory['banknote']++;
                    msg = `You got\n\`${money.toLocaleString()}\`<a:${coin.name}:${coin.id}>\n💶 **Banknote** - 1\n\n from your loot box!`;
                }
                data.Inventory[item]--;
                message.reply(msg);
            }
            else if (item.includes('robbers')) {
                // Nothing
            }
            else {
                message.reply('This item cant be used! :thinking:')
            }
            await inventory.findOneAndUpdate({ User: message.author.id }, data);
        })
    }
}
