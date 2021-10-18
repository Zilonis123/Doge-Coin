const config = require('../../config.json');
const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');
const { post } = require('node-superfetch');

module.exports = {
  name: 'eval',
  description: 'ok how did you get here?',
  aliases: ['exec', 'execute'],
  async execute(message, args, client) {
    if (!config.trusted.includes(message.author.id)) return;
    
    const code = args.join(' ');
    if (!code) {
      message.reply('Add some code please!');
      return;
    }
    
    const embed = new MessageEmbed()
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setAuthor('Eval command!')
        .addField('Input', "```js\n" + code + "```");
    
    try {
      const result = await eval(code);
      let output = result;
      
      if (typeof result !== 'string') {
        output = inspect(result);
      }
      
      output = clean(output);
      if (output.length > 1024) {
        const {body} = await post('https://hastebin.com/documents').send(output);
        embed.addField('Output', `https://hastebin.com/${body.key}.js`).setColor('GREEN');
      }
      else {
        embed.addField('Output', "```js\n" + output + "```").setColor('GREEN');
      }
      
      message.channel.send({ embeds: [embed] })
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const {body} = await post('https://hastebin.com/documents').send(err);
        embed.addField('Output', `https://hastebin.com/${body.key}.js`).setColor('GREEN');
      }
      else {
        embed.addField('Output', "```js\n" + err + "```").setColor('RED');
        
      }
      message.channel.send({ embeds: [embed] })
    }
  }
}
function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@");
  }
  else {
    return string;
  }
}
