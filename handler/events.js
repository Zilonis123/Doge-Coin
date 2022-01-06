const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.yellow.bold('EVENT STATUS━━━━━━━━━━━━━━━━━━━━━┓'));
    const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventFiles.map((file) => {
        const event = require(file);

        let eventName = event.alias || event.name || 'No event name';
        let option = eventName == 'No event name' ? '❌' : '✅';

        if(eventName != 'No event name') {
            if(event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
        console.log(`${chalk.yellow.bold('┃')} Loaded: ${option} ${chalk.yellow.bold('┃')} ${eventName}`);
    })
    console.log(chalk.yellow.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));
}