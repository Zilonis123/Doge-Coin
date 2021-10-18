const config = require('../../config.json');
const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'eval',
  description: 'ok how did you get here?',
  aliases: ['exec', 'execute'],
  async execute(message, args, client) {
    if (!config.trusted.include(message.author.id)) return;
    
    const code = args.join(' ');
    if (!code) message.reply('Add some code please!');
    
    try {
      const result = await eval(code);
      let output = result;
      
      if (typeof result !== 'string') {
        output = inspect(result);
      }
      
      message.channel.send({ content: `${output}`})
    } catch (error) {
      message.channel.send('Evaluated content is too long to display!')
    }
  }
}
