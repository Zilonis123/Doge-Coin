const schema = require('../../models/inventory');
const create = require('../../inventory create');
const items = require('../../shopitems');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { loadImage, createCanvas} = require('canvas');
const toolkit = require('emoji-toolkit');

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: 'Open your inventory',
    async execute(message, args, client) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const lol = await global.emojis('lol');
        if (!user) user = message.author;
        const player = await schema.findOne({ User: user.id });
        let tag = user.tag;
        if (!user) tag = 'Private';
        if (!player) {
            return message.reply(`${tag} doesn't have an inventory, what a looser! ${lol}`);
        }
        
        // create the canvas
        let len = 0
        Object.keys(player.Inventory).map((key) => {
            if (player.Inventory[key] === 0 || isNaN(player.Inventory[key])) return;
            len += 1;
        })
        const canvas = createCanvas(60, (50 * len) + 25);
        const ctx = canvas.getContext('2d');
        ctx.font = 'Oswald';
        
        // go through the data
        let pos_x = 0;
        let pos_y = 25;
        const mappedData = Object.keys(player.Inventory).map(async(key) => {
            if (player.Inventory[key] === 0 || isNaN(player.Inventory[key])) return;
            const itemName = items.find((val) => (val.item.toLowerCase().includes(key)));
            const itemDescription = items.find((val) => (val.item.toLowerCase().includes(key))).description;
            const itemPower = items.find((val) => (val.item.toLowerCase().includes(key))).type;
            let emoji = items.find((val) => (val.item.toLowerCase().includes(key))).emoji;
            
            // add text
            ctx.fillStyle = '#5DADE2';
            ctx.fillText(itemName.item, pos_x, pos_y);
            
            // add the amount
            const lenght = ctx.measureText(itemName.item).width;
            ctx.fillStyle = '#3498DB';
            ctx.fillText(`- ${player.Inventory[key].toLocaleString()}`, pos_x + lenght, pos_y)
            
            // add some value to pos_x and pos_y
            pos_y += 50

            return `${emoji} **${itemName.item}** - ${player.Inventory[key].toLocaleString()}\n- ${itemDescription} - **${itemPower}**`
        }).join('\n');
        
        // create the attachment
        const attachment = new MessageAttachment(canvas.toBuffer(), 'inventory.png')
        
        // create the embed with the attachment
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${tag}'s Inventory`)
            .setImage('attachment://inventory.png')
            .addField('Items :', `${mappedData}`);
        message.reply({ embeds: [embed], files: [attachment] });
    }
}
