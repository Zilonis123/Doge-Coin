const { MessageEmbed } = require("discord.js");
const os = require('os');
const moment = require('moment')
const { utc } = require('moment');

module.exports = {
    name: "ping",
    description: "returns the websocket ping",
    type: 'CHAT_INPUT',
    async execute({client, interaction, args}) {
        const core = os.cpus()[0]
        const clientName = client.user.tag;
        const clientCreated = utc(client.user.createdTimesstamp).format("Do MMMM YYYY");
        const clientID = client.user.id;
        const servers = client.guilds.cache.size.toLocaleString();
        const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
        const channels = client.channels.cache.size.toLocaleString();
        const commands = client.commands.size;
        const cpuCores = os.cpus().length;
        const cpuModel = core.model;
        const cpuSpeed = core.speed / 1000;
        const uptime = moment.duration( client.uptime );
        const sec = uptime.seconds() == 1 ? `${uptime.seconds()} seconds` : `${uptime.seconds()} seconds`;
        const min = uptime.minutes() == 1 ? `${uptime.minutes()} minutes` : `${uptime.minutes()} minutes`;
        const hr = uptime.hours() == 1 ? `${uptime.hours()} hours` : `${uptime.hours()} hours`;
        const days = uptime.days() == 1 ? `${uptime.days()} days` : `${uptime.days()} days`;

        let m = await interaction.followUp({ embeds: [
            new MessageEmbed()
                .setAuthor("Stats 📊", client.user.displayAvatarURL())
                .setColor(client.colors.discordYellow)
                .addFields(
                    {
                        name: 'Ping',
                        value: `\`WS Ping: ${Math.round(client.ws.ping)}ms \n Message Ping: _Pinging..._\``                        
                    },
                    {
                        name: 'Server Count',
                        value: `\`${servers} servers\``,
                        inline: true,
                    },
                    {
                        name: `User Count`,
                        value: `\`${users} users\``,
                        inline: true,
                    },
                    {
                        name: 'Channel Count',
                        value: `\`${channels} channels\``
                    },
                    {
                        name: 'Bot Info',
                        value: `\`Tag: ${clientName} \n ID: ${clientID} \n Commands: ${commands} commands \n Created on: ${clientCreated}\``,
                        inline: true,
                    },
                    {
                        name: 'CPU Info',
                        value: `\`CPU Model: ${cpuModel} \n CPU Cores: ${cpuCores} \n CPU Speed: ${cpuSpeed} GHz\``,
                        inline: true,
                    },
                    {
                        name: 'Uptime',
                        value: `\`${days}, ${hr}, ${min} and ${sec}\``,
                        inline: true,
                    },
                )
        ] })
        const msgPing = m.createdTimestamp - interaction.createdTimestamp;

        m.edit({ embeds: [
            new MessageEmbed()
                .setAuthor("Stats 📊", client.user.displayAvatarURL())
                .setColor(client.colors.discordYellow)
                .addFields(
                    {
                        name: 'Ping',
                        value: `\`WS Ping: ${Math.round(client.ws.ping)}ms \n Message Ping: ${msgPing}ms\``                        
                    },
                    {
                        name: 'Server Count',
                        value: `\`${servers} servers\``,
                        inline: true,
                    },
                    {
                        name: `User Count`,
                        value: `\`${users} users\``,
                        inline: true,
                    },
                    {
                        name: 'Channel Count',
                        value: `\`${channels} channels\``
                    },
                    {
                        name: 'Bot Info',
                        value: `\`Tag: ${clientName} \n ID: ${clientID} \n Commands: ${commands} commands \n Created on: ${clientCreated}\``,
                        inline: true,
                    },
                    {
                        name: 'CPU Info',
                        value: `\`CPU Model: ${cpuModel} \n CPU Cores: ${cpuCores} \n CPU Speed: ${cpuSpeed} GHz\``,
                        inline: true,
                    },
                    {
                        name: 'Uptime',
                        value: `\`${days}, ${hr}, ${min} and ${sec}\``,
                        inline: true,
                    },
                )
        ] })
    }
};
