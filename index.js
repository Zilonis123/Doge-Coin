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
const express = require('express')
const Topgg = require('@top-gg/sdk')
const fetch = require('node-fetch')
const app = express()

const webhook = new Topgg.Webhook('topggauth123') //Secure Password (Change it for god's Sake)

app.post('/', webhook.listener(vote => { //ending url
    console.log("User with id - " + vote.user + " Voted!")
    let value = JSON.stringify({
        embeds: [
            {
                title: "Another Vote!!",
                description: `<@${vote.user}> (${vote.user}) Just Voted For \`The Bot\`!!`,
                color: "8388736" //Hex -> Decimal
            }
        ]
    })
    fetch("https://discord.com/api/webhooks/876788316723372042/gnY7wD3oyfNwvMplcBmtkSqFA9sh2IRph-CYiWZIIp9Ws3661RIA79zw8e9Arth4uBos", { //Your webhook here
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: value
    }).catch(e => console.log('Error occured while posting webhook : ' + e))
}))
const port = process.env.PORT || 3000;
console.log(`Applications port is - ` + port)
app.listen(port) //Port

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