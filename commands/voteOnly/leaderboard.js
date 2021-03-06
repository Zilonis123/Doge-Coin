const { MessageEmbed } = require('discord.js');
const { pagination } = require('reconlx');
const schema = require('../../models/wallet');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'rich'],
    cooldown: 5,
    description: 'Check the servers leaderboard',
    voteOnly: true,
    async execute(message, args, client) {
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');

        const embeds = []

        let userIDs = [];
        message.guild.members.cache.forEach(async(m) => {
            if (!m.user.bot) userIDs.push(m.id);
        })

        let data = [];
        for (id of userIDs) {
            const sch = await schema.findOne({ User: id });
            if (sch && sch.Wallet !== 0) {
                data.push(sch);
            }
        }

        const sorted = data.sort((a, b) => b.Wallet - a.Wallet);
        
        let i = 1;
        if (data.length > 10) {
            const chunks = chunkz(sorted, 10);
            let arry = [];

            for (chunk of chunks) {
                const chunking = chunk.map((v) => `\`${i++}#\` <@${v.User}> - \`${v.Wallet.toLocaleString()}\`<a:${coin.name}:${coin.id}>`).join('\n\n');

                arry.push(
                    new MessageEmbed()
                        .setColor('YELLOW')
                        .setDescription(chunking)
                        .setThumbnail(message.guild.iconURL())
                        .setAuthor(`${message.guild.name} Leaderboard`)
                        .setFooter('This is their Wallet not the NetWorth\n\n')
                )
            }
            pagination({
                embeds: arry,
                message: message,
                time: 30000,
                fastSkip: true,
            });
        }
        else {
            const chunking = sorted.map((v) => `\`${i++}#\` <@${v.User}> - \`${v.Wallet.toLocaleString()}\`<a:${coin.name}:${coin.id}>`).join('\n\n');

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('YELLOW')
                        .setDescription(chunking)
                        .setThumbnail(message.guild.iconURL())
                        .setAuthor(`${message.guild.name} Leaderboard`)
                        .setFooter('This is their Wallet not the NetWorth\n\n')
                ]
            })
        }
    }
}

function chunkz (arr, size){
    var array = [];
    for(var i =0; i < arr.length; i += size){
        array.push(arr.slice(i, i+size))
    }
    return array;
}
