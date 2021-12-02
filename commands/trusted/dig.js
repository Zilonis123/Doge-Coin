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
    let desc = '  A B C\n';
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
    let embed = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${desc}`)
      .setFooter(`Miner : ${message.author.username}`, message.author.displayAvatarURL())
      .setTitle('The mines');
    const mesg = message.channel.send({ embeds: [embed] });
    
    // getting commands from user
    let item = 0;
    let list = 0;
    let done = true;
    message.reply('Please send a tile id (example : `a1`)');
    while (done) {
      // waiting for reply
      const filter = m => m.author.id === message.author.id;
      const ans = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).catch((err) => {});
      if (!ans) break;
      const key = ans.first().content.toLowerCase();
      console.log(key, level)

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
    
    const recieved = recieved = level[list].splice(item, 1, 'MINED');
    // editing embed
    desc = '  A B C\n'
    for (let h = 0; h < HEIGHT; h++) {
      if (h === 0) desc += '1 '
      if (h === 1) desc += '2 '
      if (h === 2) desc += '3 '
      for (let w = 0; w < WIDTH; w++) {
        if (level[list][item] === 'O') {
          desc += `${diamond} `;
          continue;
        }
        desc += `ROCK `;
      }
      desc += '\n'
    }
    embed.description(`${desc}`).author('The map');
    msg.edit({ embeds: [embed] })
    
    if (recieved === 'O') return message.reply(`You are lucky you found a diamond ${diamond}`);
    message.reply('You found a regular rock better luck next time..')
  }
}
