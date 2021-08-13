const { MessageEmbed } = require('discord.js');
const schema = require('../../models/wallet');
const create = require('../../wallet create');
module.exports = {
    name: 'beg',
    description: 'Use this if you are poor as me',
    cooldown: 60,
    async execute(message, args, client) {
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');
        const lmfao = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577308927811594');
        const troll = client.guilds.cache.get('873965279665860628').emojis.cache.get('874624861337690142');
        const Nomessages = [
            {
                name: 'Subaru',
                message: `**Broom Broom** <a:${lol.name}:${lol.id}>`,
            },
            {
                name: 'Mr.Crab',
                message: `<a:${lmfao.name}:${lmfao.id}> Do you really expect for me to give you 5 cents!`,
            },
            {
                name: 'Troll face',
                message: `<a:${troll.name}:${troll.id}>`
            },
            {
                name: 'Emoji',
                message: `:sob:`
            },
            {
                name: 'Zombie',
                message: `**Bruhhhhhhhhhhhhh...**`
            },
            {
                name: 'POOP',
                message: `**Comes out of a##**`
            },
            {
                name: 'Kel8lus',
                message: `Don\'t call me K8`
            },
            {
                name: 'Subaru',
                message: `eww, why would i give <a:${coin.name}:${coin.id}> to you, im subaru not a donor`,
            },
            {
                name: 'Juggernaut',
                message: 'I\'m the Juggernaut, bitch!',
            },
        ];
        const Yesmessages = [
            {
                name: 'Yo, homie',
                message: `Wanna Netflix and chill? \`{money}\`<a:${coin.name}:${coin.id}>`,
            },
            {
                name: 'Grape-Man#9106',
                message: `Oh you poor child take some money \`{money}\`<a:${coin.name}:${coin.id}>`
            },
            {
                name: 'A child',
                message: `Take this \`{money}\`<a:${coin.name}:${coin.id}> you peace of shit! **You take the money and think where did this child learn this**`,
            },
            {
                name: 'The news',
                message: `**AUTO TUNE THIS ** \`{money}\`<a:${coin.name}:${coin.id}>`,
            },
            {
                name: 'Sad guy',
                message: `My wife just left me \`{money}\`<a:${coin.name}:${coin.id}> take it please dont become like me`,
            },
            {
                name: 'Youtuber',
                message: `Today im jumping off a cliff for \`{money}\`<a:${coin.name}:${coin.id}>, Haters gonna say its fake`,
            },
            {
                name: 'Steve Harwell',
                message: `Somebody once told me the world is gonna roll me
                I ain't the sharpest tool in the shed
                She was looking kind of dumb with her finger and her thumb
                In the shape of an "{money}" on her forehead`,
            },
            {
                name: 'Rick Astley',
                message: `Never gonna make you cry\nNever gonna say goodbye\nNever gonna give you \`{money}\`\nAnd hurt you`
            },
            {
                name: 'A weird man',
                message: `Thats what she said, i didnt give her the money tho you take it \`{money}\`<a:${coin.name}:${coin.id}>`,
            },
            {
                name: 'A teenage girl',
                message: `I'll give you \`{money}\`<a:${coin.name}:${coin.id}> if you tell me what do you thing about this face **Does the duckface**`,
            },
        ];
        const random = Math.floor(Math.random() * 100) + 1;
        if (random >= 60) {
            const money = Math.floor(Math.random() * 5000) + 1;
            const num = Math.floor(Math.random() * Yesmessages.length);
            let msg = Yesmessages[num].message;
            msg = msg.replace('{money}', `${money.toLocaleString()}`);
            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(`${Yesmessages[num].name}`)
                .setDescription(`${msg}`);
            message.reply({ embeds: [embed] });
            const schems = await schema.findOne({ User: message.author.id });
            if (!schems) {
                await create(message.author, money, 0);
                return;
            }
            schems.Wallet = schems.Wallet + money;
            schems.save();
            return;
        }
        const num = Math.floor(Math.random() * Nomessages.length);
        const msg = Nomessages[num].message;
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${Nomessages[num].name}`)
            .setDescription(`${msg}`);
        message.reply({ embeds: [embed] });
        const schems = await schema.findOne({ User: message.author.id });
        if (!schems) {
            await create(message, 0, 0);
            return;
        }
    }
}