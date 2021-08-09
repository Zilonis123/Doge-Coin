const client = require('../index');
client.on('ready', async() => {
    console.log(`${client.user.tag} is ready`);
    client.user.setActivity(`${process.env.PREFIX} help`, { type: 'WATCHING' })
})
