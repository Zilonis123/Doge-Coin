const { MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = {
    name: "ping",
    description: "returns the websocket ping",
    type: 'CHAT_INPUT',
    async execute(client, interaction, args) {
        const uptime = client.uptime / 1000
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .addFields(
                { name: 'Ping', value: `${client.ws.ping}ms!`, inline: true },
                { name: 'Uptime', value: `${ms(uptime)}!`, inline: true }
            )
        interaction.followUp({ content: 'Pong!', embeds: [embed] });
    }
};
