const client = require('../index');
const moment = require('moment');
const daily = require('../models/daily');
client.on('ready', async() => {
    console.log(`${client.user.tag} is ready`);
    
    const messages = [
        `${process.env.PREFIX} help`,
        'mentions',
        `${client.guilds.cache.size} supporters`
    ];
    
    

    setInterval(async function() {
        const random = Math.floor(Math.random() * messages.length);
        client.user.setActivity(messages[random], { type: 'WATCHING' });
        const guild = await client.guilds.cache.get('873965279665860628');
        const servers = await guild.channels.cache.get('883741475282747472');
        const members = await guild.channels.cache.get('883741475358261318');
        let mc = 0;
        await client.guilds.cache.forEach((g) => {
            mc += g.memberCount;
        });
        servers.setName(`😮Supporters - ${client.guilds.cache.size}`);
        members.setName(`😎Serving ${mc}`);
    }, 3600000);
})
