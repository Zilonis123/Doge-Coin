const client = require('../index');
const moment = require('moment');
const daily = require('../models/daily');
client.on('ready', async() => {
    console.log(`${client.user.tag} is ready`);
    client.user.setActivity(`${process.env.PREFIX} help`, { type: 'WATCHING' });

    setInterval(async function() {
        const guild = await client.guilds.cache.get('873965279665860628');
        const servers = await guild.channels.cache.get('883741475282747472');
        const members = await guild.channels.cache.get('883741475358261318');
        let mc = 0;
        await client.guilds.cache.forEach((g) => {
            mc += g.memberCount;
        });
        servers.setName(`😮DC supporters - ${client.guilds.cache.size}`);
        members.setName(`😎Serving ${mc} members`);
    }, 30000);
})
