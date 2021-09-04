const create = require('../../wallet create');
const schema = require('../../models/wallet');
const inventory = require('../../models/inventory');
const { MessageEmbed } = require('discord.js');
const creates = require('../../daily create');
const schemas = require('../../models/daily');
const moment = require('moment');

module.exports = {
    name: 'daily',
    aliases: ['d'],
    description: 'Get your daily money',
    async execute(message, args, client) {
        const isAllowed = await schemas.findOne({ User: message.author.id });
        const number = moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds');
        if (isAllowed) return message.reply(`You can recieve your daily again \`${moment().seconds(number).fromNow()}\``);
        await creates(message.author);
        client.daily.set(message.author.id, 'start')
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const sch = await schema.findOne({ User: message.author.id });

        let text = `You got \`{items}\`<a:${coin.name}:${coin.id}>\n\nCome back in ${moment().seconds(number).fromNow()} here is your daily`
        const random = Math.floor(Math.random() * 10);
        if (random === 1) {
            text = text.replace('{items}', '25,000\n1 - 📦loot box');
            inventory.findOne({ User: message.author.id }, async(err, data) => {
                if (data) {
                    const hasItem = Object.keys(data.Inventory).includes('loot');
                    if (!hasItem) {
                        data.Inventory['loot'] = 1;
                    }
                    else {
                        data.Inventory['loot'] += 1;
                    }
                    console.log(data);
                    await inventory.findOneAndUpdate({ User: message.author.id }, data)
                }
                else {
                    new inventory({
                        User: message.author.id,
                        Inventory: {
                            ['loot']: 1
                        },
                    }).save();
                }
            });
        }
        if (!sch) {
            await create(message.author, 25000, 0);
            return message.channel.send({ embeds: [new MessageEmbed().setColor('YELLOW').setDescription(`You got \`25,000\`<a:${coin.name}:${coin.id}>\n\nCome back in ${moment().seconds(number).fromNow()}`).setAuthor(`${message.author.tag} here is your daily`)] });
        }
        message.channel.send({ embeds: [new MessageEmbed().setColor('YELLOW').setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`${text}`)] });
        sch.Wallet += 25000,
        sch.save();
    }
}