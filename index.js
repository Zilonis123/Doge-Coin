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
// Adding global stuff
global.config = require('./config.json');
global.emojis = require('./Shorteners/Emojis.js');
global.multiplier = require('./Shorteners/multiplier.js');

process.on('uncaughtException', (err, origin) => {
  const guild = client.guilds.cache.get(global.config.guild);
  const channel = guild.channels.cache.get('873969940602978345');
  channel.send(`Exception origin: ${origin}`);
});



require('./handler')(client);
// Database
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then((db) => {
    console.log(`Connected to the database`);
	client.database = db
}).catch((err) =>{
    console.log(err);
});

client.login(process.env.TOKEN);
