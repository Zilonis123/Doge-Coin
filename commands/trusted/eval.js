const config = require('../../config.json');
const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');

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
    
    try {
      const result = await eval(code);
      let output = result;
      
      if (typeof result !== 'string') {
        output = inspect(result);
      }
      
      let msg = `\`\`\`js\n${output}\`\`\``;
      if (msg.length > 250) msg = 'Too long to display!'
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setAuthor('Eval command!')
        .addField('code', `\`\`\`js\n${code}\`\`\``)
        .addField('result', `${msg}`)
      message.channel.send({ embeds: [embed] })
    } catch (error) {
      message.channel.send('Evaluated content is too long to display!')
    }
  }
}
