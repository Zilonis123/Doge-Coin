const client = require('../index.js');
const { MessageEmbed, WebhookClient } = require('discord.js');

const webclient = new WebhookClient({ id: '899596753622429706', token: '-1MVdaYhVUila7XWIvoAFhJzSBaTPkWRH-Gmx6yKU408TLEOl613vCERcjhdUA3VZyJI' });

client.on('guildCreate', async(guild) => {
  const sguild = await client.guilds.cache.get('873965279665860628');
  const role = await sguild.roles.cache.get('899593005172924427');
  const member = await guild.members.cache.get(guild.ownerId);
  const smember = await sguild.members.cache.get(guild.ownerId);
  let message = `${member.username} is in the server`;
  if (!smember) message = `servers owner is not in the server`
  
  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setFooter(message)
    .setDescription('Doge coin has joined another happy server!\nLets reach our goal of beeing verified quicker!')
    .setAuthor('Joined a server');
  webclient.send({
      username: 'Join logs',
      avatarURL: client.user.displayAvatarURL(),
      embeds: [embed],
      content: `${role}`,
  })
});

client.on('guildDelete', async(guild) => {
  const sguild = await client.guilds.cache.get('873965279665860628');
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
});
