const client = require('../index.js');
const { MessageEmbed, WebhookClient } = require('discord.js');

const webclient = new WebhookClient({ id: '899596753622429706', token: process.env.JOIN_WEBHOOK_TOKEN });

module.exports = {
  name: 'guildDelete',
  alias: 'Leave logs',
  async execute() {
    const sguild = await client.guilds.cache.get('873965279665860628');
    if (!client.isReady() || !sguild.available) return;
    
    const role = await sguild.roles.cache.get('899593005172924427');
    
    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setFooter('RIP')
      .setDescription('Doge coin has left a guild.. really sad hopefully noone says anything in general!')
      .setAuthor('Left a server');
    webclient.send({
        username: 'Leave logs',
        avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
        content: `${role}`,
    })
  }
}
