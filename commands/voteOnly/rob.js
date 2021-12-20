const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const pacis = require('../../models/pacifist');

module.exports = {
    name: 'rob',
    aliases: ['steal'],
    description: 'Steal someones cash',
    cooldown: 60,
    async execute(message, args, client) {
        // check if gay
        const paci = await pacis.findOne({ User: message.author.id })
        if (paci) return message.reply('You are in pacifist👨‍🦳 mode you cant rob anyone!')
        const pacic = await pacis.findOne({ User: user.id })
        if (pacic) return message.reply(`You can\'t rob ${user} because they are a 👨‍🦳hippy!`);

        // get emojis
        const lol = await global.emojis('lol');
        const coin = await global.emojis('coin');

        const user = message.mentions.users.first();
		if (!user) return message.reply({ content: `try running the command again, but this time actually mention someone to steal from` })

		if (user.id === message.author.id) return message.reply({ content: `hey stupid, seems pretty dumb to steal from urself` })


		let Bal = await client.Bal(user.id)
		if (Bal < 5000) return message.reply({ content: `The victim doesn't have at least ${coin} 5000, not worth it man` })

		let uBal = await client.Bal(message.author.id)
		if (uBal < 5000) return message.reply({ content: `You need at least ${coin} 5000 to try and rob someone.` })

		if (user.bot) return message.reply({ content: `You are not allowed to steal from bots, back off my kind` })

		const coins = Math.floor(Math.random() * 6500)
		const lostCoins = Math.floor(Math.random() * 9999)

		function random() {
			const num = Math.floor(Math.random() * 2);
			return num === 1;
		};

		if (random() === true) {

			message.reply({ content: `You stole a small portion! 💸\nYour payout was** ${coin} ${coins}**.` })
			client.Add(message.author.id, coins)
			client.Remove(user.id, coins)
		} else {
			message.reply({ content: `You were caught **HAHAHA**${lol}\nYou paid ${user.username} **${coin} ${lostcoins}**.` });
			client.Remove(message.author.id, lostCoins)
			client.Add(user.id, lostCoins)
		}
    }
}
