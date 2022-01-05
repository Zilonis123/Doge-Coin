const { Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = require('../index');
const inventory = require('../models/inventory');
const ms = require('ms');
const config = require('../config.json');
const Topgg = require(`@top-gg/sdk`);
const api = new Topgg.Api(process.env.TOPGG);


client.on('messageCreate', async(message) => {

	let prefixes = [`${process.env.PREFIX.toLowerCase()} `, `<@!${client.user.id}>`, `<@${client.user.id}>`];

    let args, cmdName;
	for (prefix in prefixes) {
		prefix = prefixes[prefix];

		if (message.content.toLowerCase().startsWith(prefix)) {
			let content = message.content.slice(prefix.length);
			if (!content) break;
	
			args = content.split(' ')[1] ? content.split(' ').slice(1) : [];

			cmdname = content.split(' ')[0].toLowerCase();
		}
	}
	const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if(!command) return;
	if (command.directory.toLowerCase() === 'trusted') {
	    let going = false;
	    for (id in config.trusted) {
	        if (message.author.id === config.trusted[id]) going = true;
	    }
            if (!going) return;
	}
    // If lockdown leave and message them
    if (global.lockdown && !global.config.trusted.includes(message.author.id)) return message.reply('Our team of developers have found a bug! Please try this again or join my support server');
	if (!message.member.permissions.has(command.permissions || [])) return message.channel.send(`You need \`${command.permissions}\` to run this command`);
	if (!message.channel.permissionsFor(message.guild.me).has(command.botPermissions || [])) return message.channel.send(`I dont have \`${command.botpermissions}\`permissions to run this command`);
	if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('I dont have `EMBED_LINKS` permission to run this command');
	// Check if has voted
	const hasVoted = await api.hasVoted(message.author.id);
	if (command.directory === 'voteOnly') {
	    if (!hasVoted) {
	    // create the message embed
		const vote_embed = new MessageEmbed()
	 	    .setColor('RED')
		    .addField('Vote required', `You have to [vote](https://top.gg/bot/873964681721679902/vote/) to use **${command.name}**`)
			.addField('Why vote?', `Voting also helps us make better bots. If you have any questions join the [support](${process.env.SERVER}) server!`)
	    	.setFooter(`User: ${message.author.tag}`, message.author.displayAvatarURL());
		
		const row = new MessageActionRow().addComponents(
		    new MessageButton()
			.setStyle('LINK')
			.setLabel('Vote')
			.setURL('https://top.gg/bot/873964681721679902/vote/'),
		    new MessageButton()
			.setStyle('LINK')
			.setLabel('Support')
			.setURL('https://discord.gg/kRgWZXTjzt')
		);
		message.channel.send({ embeds: [vote_embed], components: [row] });
		return;
	    }
	}

	// handle cooldowns
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
			return message.reply(`You will be able to use **${cmdName}** \`${ms(timeLeft * time, { long: true })}\``);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
                client.executed.set(message.author.id, command.name);
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		message.react(':x:');
	}
})
