const { Client, Collection, MessageEmbed } = require('discord.js');
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
        allowedMentions: { parse: ['users'], repliedUser: true } 
});
// Exporting the client
module.exports = client;

// Collections
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.goldRush = new Collection();
client.executed = new Collection();
// stuff thats too big for this place
require('./Utils/colors')(client);
// Adding global stuff
global.config = require('./config.json');
global.emojis = require('./Utils/Emojis.js');
global.multiplier = require('./Utils/multiplier.js');
global.lockdown = false;
client.Add = require('./Utils/Add');
client.Remove = require('./Utils/Remove');
client.Bal = require('./Utils/Bal');
client.Inventory = require('./Utils/Inventory');
client.Vote = require('./Utils/Vote');

// handler
require('./handler')(client);

// chalk
const chalk = require('chalk')
// Database
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then((db) => {
    console.log(chalk.green.bold(`Connected`) + ` to the database`);
}).catch((err) =>{
    console.log(err);
});

client.login(process.env.TOKEN);
