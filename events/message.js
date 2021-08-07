const { Collection, MessageEmbed } = require('discord.js')
module.exports = {
    name: 'message',
    once: false,
    async execute(message, client) {
        const prefix = process.env.PREFIX;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmdName = args.shift().toLowerCase();
        const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
        if(!command) return;
        if (!message.member.permissions.has(command.permissions || [])) return message.channel.send(`You need \`${command.permissions}\` to run this command`);
		if (!message.channel.permissionsFor(message.guild.me).has(command.botPermissions || [])) return message.channel.send(`I dont have \`${command.botpermissions}\`permissions to run this command`);
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('I dont have `EMBED_LINKS` permission to run this command');
        const { cooldowns } = client;
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}
        const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 2) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send({ embeds: [new MessageEmbed()
					.setColor('RED')
					.setDescription(`${command.name} is on cooldown.\nPlease wait ${timeLeft.toFixed(1)}second(s) before using it again`)
					.setTitle('Cooldown')
					.setFooter(message.author.tag)
					.setTimestamp(),
                    ]
                }
				);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args, client);
		}
		catch (error) {
			console.error(error);
			message.react(':x:');
		}
    }
}