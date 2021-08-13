const client = require('../index');
const { MessageEmbed } = require('discord.js');
const schema = require('../models/wallet');
const create = require('../wallet create');
const { pagination } = require('reconlx');

client.on('messageCreate', async(message) => {
    const prefix = process.env.PREFIX + ' ';
    const random = Math.floor(Math.random() * 100);
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();
    const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if (!command) return;
    if (random < 90 || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    const text = [
        {
            title: 'Boss karen has summoned',
            message: 'KAREN GO AWAY',
        },
        {
            title: 'Angry subaru car has summoned',
            message: 'BROOM BROOM GO AWAY',
        },
        {
            title: 'Doge is going to bite you',
            message: 'UwU please dont',
        },
        {
            title: 'Your boss is demanding more..',
            message: 'Work work work',
        }
    ];
    const num = Math.floor(Math.random() * text.length);

    const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor(text[num].title)
        .setDescription(`Type :\n\`${text[num].message}\`\n**To defeat him**`);
    message.channel.send({ embeds: [embed] });
    const filter = m => m.content.toLowerCase().includes(text[num].message.toLowerCase());
    const collector = message.channel.createMessageCollector({ filter, time: 15000 });
    let people = [];
    collector.on('collect', m => {
        if (people.includes(m.author.id) || m.author.bot) return;
        m.channel.send(`<@${m.author.id}> has damaged the boss`);
        people.push(m.author.id)
    })
    collector.on('end', async(collected) => {
        if (people.length < 1) return message.channel.send('Noone has participated! :sob:')
        let i = 1;
        let mony = 15000;
        if (collected.size >= 10) mony += 2000;
    
        const chunking = people.map((v) => `\`${i++}#\` <@${v}> `).join('\n\n');

        message.channel.send({
            embeds: [
            new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(chunking)
                    .setAuthor('Winners')
                    .setFooter(`Each won ${mony.toLocaleString()}\n1# place got 1k more`)
            ]
        })
        for (msg of people) {
            if (collected.first().author.id === msg) mony += 1000;
            const sch = await schema.findOne({ User: msg });
            if (!sch) {
                const usr = await message.guild.members.cache.get(msg);
                create(user, mony, 0);
                continue;
            }
            sch.Wallet += mony;
            sch.save();
        }
    })
    
})

function chunkz (arr, size){
    var array = [];
    for(var i =0; i < arr.lenght; i += size){
        array.push(arr.slice(i, i+size))
    }
    return array;
}