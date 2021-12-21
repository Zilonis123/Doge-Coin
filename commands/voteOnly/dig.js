const { MessageEmbed, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const inventory = require("../../models/inventory");

module.exports = {
  name: 'mine',
  description: 'Mine for some ores',
  aliases: ['dig', 'ores'],
  async execute(message, args, client) {
    // Checking if has pickaxe

    const data = await inventory.findOne({ User: message.author.id });
    const hasItem = Object.keys(data.Inventory).includes('pickaxe');
    if (!hasItem || data.Inventory['pickaxe'] < 1) return message.channel.send("You need a ⛏️pickaxe to use this command");;
    
    // Removing the pickaxe
    data.Inventory["pickaxe"]--;
    await inventory.findOneAndUpdate({ User: message.author.id }, data).catch(err => {
      message.reply('something went wrong');
      console.log(err);
    })
    


    // getting emojis
    const loading = await global.emojis('loading');
    const diamond = await global.emojis('diamond');
    const coin = await global.emojis('coin');
    
    // creating level
    let level = [["S", "S", "S"], ["S", "S", "S"], ["S", "S", "S"]];
    const keys = [['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2', 'c3']];
    const WIDTH = 3;
    const HEIGHT = 3;
    let allowed = false;
    while (!allowed) {
      const lvl = Math.floor(Math.random() * 2);
      const w = Math.floor(Math.random() * 2);
      const random = Math.floor(Math.random() * 5);
      if (random < 3 || allowed === true) {
        continue;
      }
      allowed = true;
      level[lvl][w] = 'O'
    }
    
    // sending the message with the image and creating the embed
    const attach = new MessageAttachment('thumbnails/grid.png', 'grid.png');
    let embed = new MessageEmbed()
      .setColor('YELLOW')
      .setDescription('Please send a tile id (example : `a1`)')
      .setImage('attachment://grid.png')
      .setFooter(`Miner : ${message.author.username}`, message.author.displayAvatarURL())
      .setTitle('The mines');
    const msg = await message.channel.send({ embeds: [embed], files: [attach] });
    
    // getting commands from user
    let item = 0;
    let list = 0;
    let done = true;
    while (done) {
      // waiting for reply
      const filter = m => m.author.id === message.author.id;
      const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
      if (!ans) break;
      const key = ans.first().content.toLowerCase();

      // Finding the list and item index
      list = keys.findIndex(element => element.includes(key));

      if (list < 0) {
        if (ans.first()) ans.first().delete();
        continue;
      }
      item = keys[list].findIndex(element => element.includes(key));
      done = false;
    }
    if (done) return message.reply('You took too long');
    
    
    // editing embed and creating the image
    const canvas = createCanvas(132, 132);
    const ctx = canvas.getContext('2d');
    // loading images
    loadImage('thumbnails/grid.png').then((image) => {
      ctx.drawImage(image, 0, 0, 132, 132);
    })
    const dimond = await loadImage('thumbnails/diamond.png');
    for (let h = 0; h < HEIGHT; h++) {
      for (let w = 0; w < WIDTH; w++) {
        if (level[h][w] === 'O') {
          let pos_x = (w * 32) + 32;
          let pos_y = (h * 32) + 32;
          if (w > 0) pos_x += w * 2;
          if (h > 0) pos_y += h * 2;
          ctx.drawImage(dimond, pos_x, pos_y, 32, 32);
          continue;
        }
      }
    }
    
    // require the multiplier
    const multi = await global.multiplier(message.guild, message.author.id);

    // calculate the money
    const money = Math.floor(100000 * multi);

    // send the message
    let text = 'You found a regular rock better luck next time..'
    if (level[list][item].toLowerCase() === 'o') text = `You are lucky you found a diamond ${diamond}\nYou sold it for ${money}${coin} (**${multi}** mutliplier)`;
    if (level[list][item].toLowerCase() === 'o') {
      client.Add(message.author.id, money);
    }
    
    const edited_attach = new MessageAttachment(canvas.toBuffer(), `dig.png`)
    const new_embed = new MessageEmbed().setAuthor('The map').setImage(`attachment://dig.png`).setColor('YELLOW');
    await message.reply({ embeds: [new_embed], files: [edited_attach], content: text })
  }
}
