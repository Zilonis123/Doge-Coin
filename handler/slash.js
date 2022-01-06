const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.green.bold('SLASH COMMANDS━━━━━━━━━━━━━━━━━━━┓'));

    const slashCommandsDir = await globPromise(`${process.cwd()}/SlashCommands/**/*.js`);
    const slashCommandsArray = [];
    slashCommandsDir.map((value) => {
        const file = require(value);
        let cmdName;
        let cmdOption;
        if (!file?.name) return cmdName = 'No cmd name', cmdOption = '❌';
        else {
            cmdName = file.name;
            cmdOption = '✅';
        }
        if (cmdOption == '✅') {
            client.slashCommands.set(file.name, file);
            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            slashCommandsArray.push(file);
        }
        console.log(`${chalk.green.bold('┃')} Loaded: ${cmdOption} ${chalk.green.bold('┃')} ${cmdName}`);
    })
    console.log(chalk.green.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));

    client.on('ready', async () => {
        // if the bot is in TEST MODE
        if (client.token === process.env.TEST_TOKEN) {
            await client.guilds.cache.get(global.config.TEST_GUILD).commands.set(slashCommandsArray);
        }
        else {
            await client.application.commands.set(slashCommandsArray);
        }
    })
}
