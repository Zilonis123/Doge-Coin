const client = require('../index.js');
const { MessageEmbed, WebhookClient } = require('discord.js');

client.on('guildCreate', async(guild) => {
  const webclient = new WebhookClient({ id: '899596753622429706', token: '-1MVdaYhVUila7XWIvoAFhJzSBaTPkWRH-Gmx6yKU408TLEOl613vCERcjhdUA3VZyJI' });
  const sguild = await client.guilds.cache.get('873965279665860628');
  const role = await sguild.roles.cache.get('899593005172924427');
  const member = await guild.members.cache.get(guild.ownerId);
  const smember = await sguild.members.cache.get(guild.ownerId);
  let message = `${member.username} is in the server`;
  if (!smember) message = `owner is not in  the server`
  
  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setFooter(message)
    .setDescription('Another server has invited Doge Coin')
    .setAuthor('Joined');
  webclient.send({
      username: 'Join logs',
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
      content: `${role}`,
  })
});
