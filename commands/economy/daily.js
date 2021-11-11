const create = require('../../wallet create');
const schema = require('../../models/wallet');
const inventory = require('../../models/inventory');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const moment = require('moment');

module.exports = {
    name: 'daily',
    aliases: ['d'],
    description: 'Get your daily money',
    cooldown: 86400,
    async execute(message, args, client) {
        const coin = await global.emojis('coin');
        const sch = await schema.findOne({ User: message.author.id });

        let text = `You got {items}\n\nCome back in \`1 day\``
        const random = Math.floor(Math.random() * 10);
        let cash = await global.multiplier(message.guild, message.author.id);
        cash = Math.floor(cash * 25000);
        if (random === 1) {
            text = text.replace('{items}', `\`${cash.toLocaleString()}\`${coin}\n\`1\` - 📦loot box`);
            inventory.findOne({ User: message.author.id }, async(err, data) => {
                if (data) {
                    const hasItem = Object.keys(data.Inventory).includes('loot');
                    if (!hasItem) {
                        data.Inventory['lootbox'] = 1;
                    }
                    else {
                        data.Inventory['lootbox'] += 1;
                    }
                    await inventory.findOneAndUpdate({ User: message.author.id }, data)
                }
                else {
                    new inventory({
                        User: message.author.id,
                        Inventory: {
                            ['lootbox']: 1
                        },
                    }).save();
                }
            });
        }
        text = text.replace('{items}', `\`${cash.toLocaleString()}\`${coin}`)

        if (!sch) {
            await create(message.author, cash, 0);
            return message.channel.send({ embeds: [new MessageEmbed().setColor('YELLOW').setDescription(`You got \`${cash.toLocaleString()}\`${coin}\n\nCome back in ${moment().seconds(number).fromNow()}`).setAuthor(`${message.author.tag} here is your daily`).setFooter(cash/25000 + 'x multiplier')] });
        }
        message.channel.send({ embeds: [new MessageEmbed().setColor('YELLOW').setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`${text}`).setFooter(cash/25000 + 'x multiplier')] });
        sch.Wallet += cash,
        sch.save();
    }
}
