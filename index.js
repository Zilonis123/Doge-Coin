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

const dbl = new DBL(process.env.TOPGG_TOKEN, { webhookPort: 3000, webhookAuth: process.env.TOPGG_AUTH });
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

client.login(process.env.TOKEN);
