const inventory = require('../../models/inventory');
const items = require('../../shopitems');
const create = require('../../wallet create');
const Player = require('../../models/wallet');
const Paci = require('../../models/pacifist');
const { pagination } = require('reconlx');
const { MessageEmbed } = require('discord.js');

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
                const embeds = []

                let userIDs = [];
                message.guild.members.cache.forEach(async(m) => {
                    if (!m.user.bot) userIDs.push(m.id);
                })

                let dats = [];
                for (id of userIDs) {
                    const sch = await Player.findOne({ User: id });
                    if (sch && sch.Wallet !== 0) {
                        const pacifist = await Paci.findOne({ User: id });
                        if (!pacifist) {
                            dats.push(sch);
                        }
                    }
                }

                const sorted = dats.sort((a, b) => b.Wallet - a.Wallet);
        
                let i = 1;
                if (sorted.length != null) {
                    const chunks = chunkz(sorted, 10);
                    let arry = [];

                    for (chunk of chunks) {
                        const chunking = chunk.map((v) => `\`${i++}#\` <@${v.User}> - \`${v.Wallet.toLocaleString()}\`<a:${coin.name}:${coin.id}>`).join('\n\n');

                        arry.push(
                            new MessageEmbed()
                                .setColor('YELLOW')
                                .setDescription(chunking)
                                .setThumbnail(message.guild.iconURL())
                                .setAuthor(`${message.guild.name} Wishlist`)
                                .setFooter('This is their Wallet not the NetWorth\n\n')
                        )
                    }
                    message.author.send({ embeds: [arry[0]] });
                    data.Inventory[item]--;

                }
                else {
                    message.author.send('No valid users! Try again later..');
                }
                message.reply('Check your dm\'s');
            }
            else {
                message.reply('This item cant be used! :thinking:')
            }
            await inventory.findOneAndUpdate({ User: message.author.id }, data);
        })
    }
}

function chunkz (arr, size){
    var array = [];
    for(var i =0; i < arr.length; i += size){
        array.push(arr.slice(i, i+size))
    }
    return array;
}
