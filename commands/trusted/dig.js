const { MessageEmbed, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'mine',
  description: 'Mine for some ores',
  aliases: ['dig', 'ores'],
  async execute(message, args, client) {
    // getting emojis
    const loading = await global.emojis('loading');
    const diamond = await global.emojis('diamond');
    
    // creating level
    let level = [[], [], []];
    const keys = [['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2', 'c3']];
    const WIDTH = 3;
    const HEIGHT = 3;
    for (let lvl = 0; lvl < HEIGHT; lvl++) {
      for (let w = 0; w < WIDTH; w++) {
        const random = Math.floor(Math.random() * 5);
        if (random < 3) {
          level[lvl].push('S');
          continue;
        }
      level[lvl].push('O')
      }
    }
    
    // sending the message with the image and creating the embed
    let embed = new MessageEmbed()
      .setColor('BLACK')
      .setDescription('Please send a tile id (example : `a1`)')
      .setImage('attachment://grid.png')
      .setFooter(`Miner : ${message.author.username}`, message.author.displayAvatarURL())
      .setTitle('The mines');
    const msg = await message.channel.send({ embeds: [embed] });
    
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
      console.log(key, level)

      // Finding the list and item index
      list = keys.findIndex(element => element.includes(key));
      console.log(list, keys)

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
    loadImage('img/grid.png').then((image) => {
      ctx.drawImage(image, 0, 0, 132, 132);
    })
    const dimond = await loadImage('img/diamond.png');
    for (let h = 0; h < HEIGHT; h++) {
      for (let w = 0; w < WIDTH; w++) {
        if (level[h][w] === 'O') {
          const pos_x = (w * 32) + 32;
          const pos_y = (h * 32) + 32;
          ctx.drawImage(dimond, pos_x, pos_y, 32, 32);
          continue;
        }
      }
    }
    await fs.writeFile(`${message.author.id}-dig.png`, canvas.toDataURL(), 'base64', function(err) {
        if (err) {
           console.log(err);
        }
    });
    embed.setDescription('Goodjob').setAuthor('The map').setImage(`attachment://${message.author.id}-dig.png`);
    msg.edit({ embeds: [embed] });
    
    fs.unlink(`${message.author.id}-dig.png`, function (err) {
      if (err) throw err;
    }); 
    
    if (level[list][item].toLowerCase() === 'o') return message.reply(`You are lucky you found a diamond ${diamond}`);
    message.reply('You found a regular rock better luck next time..')
  }
}
