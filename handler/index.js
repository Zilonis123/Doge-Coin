const { readdirSync } = require('fs');
module.exports = async (client) => {
    // Normal commands
    const commandFolders = readdirSync('./commands');
    for(const folder of commandFolders) {
        const commandFiles = readdirSync(`./commands/${folder}`);
        for(const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name.toLowerCase(), command);
        }
    }
    // Events
    const eventFiles = readdirSync('./events').filter(f => f.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}