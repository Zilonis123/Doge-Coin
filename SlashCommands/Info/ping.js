const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns the websocket ping",
    type: 'CHAT_INPUT',
    async execute(client, interaction, args) {
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .addFields(
                { name: 'Ping', value: `${client.ws.ping}ms!`, inline: true },
                { name: 'Uptime', value: `${client.uptime}!`, inline: true }
            )
        interaction.followUp({ content: 'Pong!', embeds: [embed] });
    }
};
