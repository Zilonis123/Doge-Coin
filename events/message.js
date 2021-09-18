const { Collection, MessageEmbed } = require('discord.js');
const client = require('../index');
const inventory = require('../models/inventory');
const ms = require('ms');

client.on('messageCreate', async(message) => {
	let prefix = process.env.PREFIX + ' ';
	if (!message.content.toLowerCase().startsWith(prefix)) {
		return;
	}
	if (message.webhookId || !message.guild) return;
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
	let time = 1000;
	const inv = await inventory.findOne({ User: message.author.id });
	if (inv) {
		const has = Object.keys(inv.Inventory).includes('clock');
		if (has) time = 500;
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * time;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / time;
			return message.reply(`You will be able to use **${cmdName}** \`${ms(timeLeft, { long: true }}\``);
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
