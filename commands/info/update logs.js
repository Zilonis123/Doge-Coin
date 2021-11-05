

module.exports = {
  name: 'updates',
  description: 'view the past bot updates',
  aliases: ['update', 'updt'],
  cooldown: 60,
  async execute(message, args, client) {
    return;
    const guild = await client.guilds.cache.get('873965279665860628');
    const channel = await guild.channels.cache.get('873969937230757938');
    const messages = await channel.messages.fetch({ limit: 50 });
    // Not finnished
  }
}
