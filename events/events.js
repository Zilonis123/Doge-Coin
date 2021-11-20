const client = require('../index');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const schema = require('../models/wallet');
const create = require('../wallet create');
const fs = require('fs');
const ms = require('ms');
const textToImage = require('text-to-image');
const { pagination } = require('reconlx');

const goldRush = async(message) => {
    client.goldRush.set(message.guild.id);
    const lasting = Math.floor(Math.random() * 180000) + 300000;
    await message.channel.send(`🤑💰💶**GOLD RUSH**💶💰🤑 has started anyone running a command in this server will get a 10x multiplier\nThis event lasts - \`${ms(lasting)}\``);
    setTimeout(function() {
        client.goldRush.delete(message.guild.id);
    }, lasting)
}

client.on('messageCreate', async(message) => {
    // If lockdown leave
    if (global.lockdown && !global.config.trusted.includes(message.author.id)) return;
    if (message.webhookId) return;
    const prefix = process.env.PREFIX + ' ';
    const random = Math.floor(Math.random() * 100);
    const args = message.content.slice(prefix.length).split(/ +/);
    const loading = client.guilds.cache.get("873965279665860628").emojis.cache.get('876456105289580544');
    const cmdName = args.shift().toLowerCase();
    const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if (!command) return;
    if (!message.guild) return message.reply('What do i look like?, You cant use me here invite me you lazy!');
    if (command.directory !== 'economy') return;
    if (random !== 1 || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    const gameMode = Math.floor(Math.random() * 1);
    // Gold rush gamem0de
    if (gameMode === 0) {
        const leaving = Math.floor(Math.random() * 10);
        if (leaving !== 1) return;
        goldRush(message);
        return;
    }
    // Events
    const thing = Math.floor(Math.random() * 2);
    let title = '';
    let msg = '';
    let send = '';
    if (thing === 0) {
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
                message: 'Master please dont',
            },
            {
                title: 'Your boss is demanding more..',
                message: 'Work work work',
            }
        ];
        const num = Math.floor(Math.random() * text.length);
        title = text[num].title;
        msg = text[num].message;
        send = text[num].message;
    }
    else if (thing === 1) {
        const txt = [
            'sussy',
            'doge',
            'woof',
            'amongus',
            'coins',
            'singing',
        ];
        title = 'Unscramble this';
        const num = Math.floor(Math.random() * txt.length);
        function scramble(a) {
            a = a.split("");
            for(var b = a.length - 1; 0 < b; b--) {
                var c = Math.floor(Math.random() * (b + 1));
                d = a[b];
                a[b] = a[c];
                a[c] = d
            }
            return a.join("")
        }
        msg = scramble(txt[num]);
        send = txt[num];
    }
    
    const dataUri = await textToImage.generate(msg, {
        textAlign: 'center',
        verticalAlign: 'center',
        bgColor: '#2b2b2a',
        textColor: '#eae6e6',
    });
    
    var base64Data = dataUri.replace(/^data:image\/png;base64,/, "");
    await fs.writeFile(`${message.author.id}-${message.channel.id}.png`, base64Data, 'base64', function(err) {
        console.log(err);
    });
            
    const file = new MessageAttachment(`${message.author.id}-${message.channel.id}.png`);

    const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor(title)
        .setDescription('Type :')
        .setFooter('Event has occured!')
        .setImage(`attachment://${message.author.id}-${message.channel.id}.png`);
    await message.channel.send({ embeds: [embed], files: [file] });
    fs.unlink(`${message.author.id}-${message.channel.id}.png`, function (err) {
        if (err) throw err;
    }); 
    const filter = m => m.content.toLowerCase().includes(send.toLowerCase());
    const collector = message.channel.createMessageCollector({ filter, time: 15000 });
    let people = [];
    // Collecting
    collector.on('collect', m => {
        if (people.includes(m.author.id) || m.author.bot) return;
        m.channel.send(`<@${m.author.id}> has damaged the boss <a:${loading.name}:${loading.id}>`);
        people.push(m.author.id);
    })
    // End
    collector.on('end', async(collected) => {
        if (people.length < 1) return message.channel.send('Noone has participated! :sob:')
        let i = 1;
        let mony = 500000;
        if (collected.size >= 10) mony += 20000;
    
        const chunking = people.map((v) => `\`${i++}#\` <@${v}> `).join('\n\n');

        message.channel.send({
            embeds: [
            new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(chunking)
                    .setAuthor('Winners')
                    .setFooter(`Each won ${mony.toLocaleString()}`)
            ]
        })
        for (msg of people) {
            const sch = await schema.findOne({ User: msg });
            if (!sch) {
                const usr = await message.guild.members.cache.get(msg);
                create(usr, mony, 0);
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
