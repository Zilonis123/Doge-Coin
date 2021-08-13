const client = require('../index');
const { MessageEmbed } = require('discord.js');
const schema = require('../models/wallet');
const create = require('../wallet create');
const { pagination } = require('reconlx');

client.on('messageCreate', async(message) => {
    const prefix = process.env.PREFIX + ' ';
    const random = Math.floor(Math.random() * 100);
    if (random < 75 || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
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
        let i = 1;
    
        const chunking = people.map((v) => `\`${i++}#\` <@${v}> `).join('\n\n');

        message.channel.send({
            embeds: [
            new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(chunking)
                    .setAuthor('Winners')
                    .setFooter('Each won 15,000k')
            ]
        })
        for (msg of people) {
            const sch = await schema.findOne({ User: msg });
            if (!sch) {
                const usr = await message.guild.members.cache.get(msg);
                create(user, 15000, 0);
                continue;
            }
            sch.Wallet += 15000;
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