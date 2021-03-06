const client = require('../index.js');
const { MessageEmbed, WebhookClient } = require('discord.js');

const webclient = new WebhookClient({ id: '899596753622429706', token: process.env.JOIN_WEBHOOK_TOKEN });

module.exports = {
  name: 'guildCreate',
  alias: 'Join logs',
  async execute() {
  const sguild = await client.guilds.cache.get('873965279665860628');
  const role = await sguild.roles.cache.get('899593005172924427');
  
  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setFooter("Awesome!!!!")
    .setDescription(`${client.user.tag} has joined another happy server!\nLets reach our goal of beeing verified quicker!`)
    .setAuthor('Joined a server');
  webclient.send({
      username: 'Join logs',
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
      content: `${role}`,
  })
}
}
