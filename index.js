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

// Vote logs
const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3Mzk2NDY4MTcyMTY3OTkwMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI5MTEwNjI0fQ.myJvkBDnrRPkKZ1uX93cKRak8qHMVeBnXtxJbJvH0eo', { webhookPort: 3000, webhookAuth: 'topggauth123' });
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', async(vote) => {
	const channel = client.channels.cache.get('876915018606714891')
	const embed = new MessageEmbed()
		.setTitle("__Thanks for voting__")
		.setDescription(`Thank you <@${vote.user}}> for voting\nYou recieved \`50,000\` and a loot box`)
		.setFooter("Your vote means a lot!")
		.setColor("YELLOW")

	const schema = require('./models/wallet');
	const inventory = require('./models/inventory');
	const create = require('./wallet create');
	const wallet = await schema.findOne({ User: vote.user });
	const memb = client.members.cache.get(vote.user);
	if (!wallet) create(memb, 50000, 0);
	else {
		wallet.Wallet += 50000;
		wallet.save();
	}

	await inventory.findOne({ User: vote.user }, async(err, data) => {
		if (data) {
			const hasItem = Object.keys(data.Inventory).includes('voter box');
			if (hasItem) {
				data.Inventory['voter box']++
			}
			else {
				data.Inventory['voter box'] = 1;
			}
			await Inventory.findOneAndUpdate({ User: vote.user }, data);
		}
		else {
			Inventory.create({
				User: vote.user,
				Inventory: {
					'voter box': 1
				}
			}).save();
		}
	})
	channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
