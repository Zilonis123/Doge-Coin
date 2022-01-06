const client = require('../index');
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute() {
        console.log(chalk.yellow.bold(`${client.user.tag}`) + ` is ready`);
        
        const messages = [
            `${process.env.PREFIX} help`,
            'mentions',
            `${client.guilds.cache.size} supporters`
        ];
        
        const random = Math.floor(Math.random() * messages.length);
        client.user.setActivity(messages[random], { type: 'WATCHING' });
        setInterval(async function() {
            const random = Math.floor(Math.random() * messages.length);
            client.user.setActivity(messages[random], { type: 'WATCHING' });
            const guild = await client.guilds.cache.get('873965279665860628');
            const servers = await guild.channels.cache.get('883741475282747472');
            const serv_members = await guild.channels.cache.get('897059296846684221');
            const members = await guild.channels.cache.get('883741475358261318');
            let mc = 0;
            await client.guilds.cache.forEach((g) => {
                mc += g.memberCount;
            });
            servers.setName(`😮Servers ${client.guilds.cache.size}`);
            const rounded = Math.round(mc/100)*100;
            members.setName(`😎Users ${rounded}`);
            serv_members.setName(`😁SMembers ${guild.memberCount}`);
        }, 3600000);
    }
}
