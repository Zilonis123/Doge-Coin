const schema = require('../../models/inventory');
const create = require('../../inventory create');
const items = require('../../shopitems');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { loadImage, createCanvas} = require('canvas');
const canvasTxt = require('canvas-txt').default

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: 'Open your inventory',
    async execute(message, args, client) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const lol = await global.emojis('lol', message.guild.id);
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
        const canvas = createCanvas(150, (80 * len) + 25);
        const ctx = canvas.getContext('2d');
        
        // make the background look nice
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#424242';
        ctx.fill();
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#515A5A';
        ctx.stroke();
        
        // declare the font
        ctx.font = 'Source Sans 3';
        
        // go through the data
        // let pos_x = 7;
        // let pos_y = 32;
        const mappedData = Object.keys(player.Inventory).map((key) => {
            if (player.Inventory[key] > 0 || !isNaN(player.Inventory[key])) {
                const info = items.find((val) => (val.item.toLowerCase().includes(key)));
                const itemDescription = items.find((val) => (val.item.toLowerCase().includes(key))).description;
                const itemPower = items.find((val) => (val.item.toLowerCase().includes(key))).type;
                let emoji = items.find((val) => (val.item.toLowerCase().includes(key))).emoji;
                
                // add text
                //if (info.image) {
                    //console.log('ok')
                    //const image = await loadImage(`thumbnails/${info.image}`)
                    //ctx.drawImage(image, pos_x, pos_y);
                    //pos_x += 37;
                //}
                //ctx.fillStyle = '#D6DBDF';
                //canvasTxt.fontSize = 15
                //ctx.fillText(`${info.item} -`, pos_x, pos_y);
                
                // Measure lenght
                //const lenght = ctx.measureText(info.item);

                // Add amount
                //ctx.fillStyle = '#5DADE2';
                //ctx.fillText(` ${player.Inventory[key].toLocaleString()}`, pos_x + lenght.width + 4, pos_y);
                
                // add description
                //canvasTxt.align = 'left';
                //canvasTxt.drawText(ctx, info.description, pos_x, pos_y + lenght.emHeightAscent + 4, canvas.width - 14, 5);

                
                // add some value to pos_x and pos_y
                //pos_y += 80

                return `${emoji} **${info.item}** - ${player.Inventory[key].toLocaleString()}\n- ${itemDescription} - **${itemPower}**`
            }
        }).join('\n');
        
        // create the attachment
        // const attachment = new MessageAttachment(canvas.toBuffer(), 'inventory.png')
        
        // create the embed with the attachment
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${tag}'s Inventory:`)
            .setDescription(mappedData)
        message.reply({ embeds: [embed] });
    }
}
