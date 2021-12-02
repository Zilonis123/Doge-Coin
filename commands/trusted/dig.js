const { MessageEmbed } = require('discord.js');

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
    // make the list readable for the user
    let desc = 'A B C\n';
    for (let h = 0; h < HEIGHT; h++) {
      if (h === 0) desc += '1 '
      if (h === 1) desc += '2 '
      if (h === 2) desc += '3 '
      for (let w = 0; w < WIDTH; w++) {
        desc += `${loading} `;
      }
      desc += '\n'
    }
    // sending the message with the image and creating the embed
    const embed = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${desc}`)
      .setFooter(`Miner : ${message.author.username}`, message.author.displayAvatarURL())
      .setTitle('The mines');
    
    
    // getting commands from user
    let item = '';
    let list = '';
    let done = true;
    while (done) {
      // waiting for reply
      message.reply('Please send a tile id (example : `a1`)');
      const filter = m => m.author.id === message.author.id;
      const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
      if (!ans) break;
      const key = ans.first().content.toLowerCase();

      list = keys.findIndex(element => element.includes(key));
      if (list < 0 || !list) {
        message.channel.send('You entered a non existing tile or its allready mined!');
        continue;
      }
      item = keys[list].findIndex(element => element.includes(key));
      done = false;
    }
    if (item === '') return message.reply('You took too long');
    
    
    const recieved = level[list].splice(item, 1, 'MINED');
    if (recieved === 'O') return message.reply(`You are lucky you found a diamond ${diamond}`);
    message.reply('You found a regular rock better luck next time..')
  }
}
