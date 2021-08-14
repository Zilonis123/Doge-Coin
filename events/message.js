const { Collection, MessageEmbed } = require('discord.js');
const client = require('../index');
const schemas = require('../models/daily');
const hip = require('../models/resign as hippy');
const moment = require('moment')

client.on('messageCreate', async(message) => {
	let prefix = process.env.PREFIX + ' ';
	if (!message.content.toLowerCase().startsWith(prefix)) {
		return;
	}
	const isAllowed = await schemas.findOne({ User: message.author.id });
	if (isAllowed) {
		const start = client.daily.get(message.author.id);
		if (start === 'start' || (start !== 'on' && start !== 'off')) {
			client.daily.set(message.author.id, 'on');
			function midnightTask() {
				isAllowed.delete();
				client.daily.set(message.author.id, 'off')
			}
			setTimeout(
				midnightTask,
				moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds') * 1000
			);
		}
	}

	const hippy = await hip.findOne({ User: message.author.id });
	if (hippy) {
		const start = client.hippy.get(message.author.id);
		if (start === 'start' || (start !== 'on' && start !== 'off')) {
			client.hippy.set(message.author.id, 'on');
			function midnightTask() {
				hippy.delete();
				client.hippy.set(message.author.id, 'off')
			}
			setTimeout(
				midnightTask,
				moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds') * 1000
			);
		}
	}
	if (message.author.id === '727757852021883000' || message.author.id === '876058476034523156') return message.reply('Bruh, blacklisted');
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
	console.log(`${message.author.tag} just used ${cmdName}`);
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`You will be able to use **${cmdName}** \`${moment(expirationTime).fromNow()}\``);
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
})
