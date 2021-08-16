const { Client, Collection, WebhookClient } = require('discord.js');
require('dotenv').config();
const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_INTEGRATIONS',
		'GUILD_WEBHOOKS',
		'GUILD_INVITES',
		'GUILD_VOICE_STATES',
		'GUILD_PRESENCES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGE_TYPING',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS',
		'DIRECT_MESSAGE_TYPING',
	],
	partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});
// Checking if dbl is ready
const dbl = require('dblapi.js');
const DBL = new dbl(process.env.DBLTOKEN, { webhookPort: 5000, webhookAuth: process.env.DBLAUTH });
DBL.webhook.on('ready', () => {
	console.log('DBL is ready!');
});

// Collections
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.daily = new Collection();
client.hippy = new Collection();
client.config = require('./config.json');

module.exports = client;

require('./handler')(client);
// Database
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) =>{
    console.log(err);
});
// Vote tracking
DBL.webhook.on('vote', async(vote) => {
	console.log(`${vote.user} has just voted for ${client.user.tag} in top.gg`);
	const webclient = new WebhookClient({ id: '876788316723372042', token: 'gnY7wD3oyfNwvMplcBmtkSqFA9sh2IRph-CYiWZIIp9Ws3661RIA79zw8e9Arth4uBos' });
	webclient.send({
		username: 'Doge Coin',
		avatarURL: 'https://cdn.discordapp.com/avatars/873964681721679902/99d7f0d7011fc999b289527cef71b3a1.webp?size=1024',
		content: `${vote.user} has just voted for ${client.user.tag} in top.gg!`
	});
	const inventory = require('./models/inventory');
	inventory.findOne({ User: vote.user }, async(err, data) => {
		if (data) {
			const hasItem = Object.keys(data.Inventory).includes('voter box');
			if (hasItem) {
				data.Inventory['voter box']++;
			}
			else {
				data.Inventory['voter box'] = 1;
			}
			await inventory.findOneAndUpdate({ User: vote.user }, data);
		}
		else {
			new inventory({
				User: vote.user,
				Inventory: {
					'voter box': 1,
				}
			}).save();
		}
	})
});
// LOG IN

client.login(process.env.TOKEN);