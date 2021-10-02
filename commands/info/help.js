const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Shows the help command!',
    async execute(message, args, client) {
        const emojis = {
            info: '📰',
            economy: '💰',
            settings: '🔨',
        }
        const directories = [...new Set(client.commands.map(cmd => cmd.directory))];

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories  = directories.map((dir) => {
            const getCommands = client.commands.filter(
                (cmd) => cmd.directory === dir
            ).map(cmd => {
                return {
                    name: cmd.name || 'In progress',
                    description: 
                        cmd.description || 
                        'Description is in progress',
                }
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });
        const guild = await client.guilds.cache.get('873965279665860628');
        const channel = await guild.channels.cache.get('873969937230757938');
        
        const msg = await channel.messages.fetch({ limit: 1 });
        const initEmbed = new MessageEmbed()
            .setDescription(`Need help?👀 select a category from the menu!\nNeed Support join [here](https://discord.gg/kRgWZXTjzt)`)
            .setColor('YELLOW')
            .addField('Latest update :', `${msg.first().content}`);

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('help-menu')
                    .setPlaceholder('Please select a category')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: emojis[cmd.directory.toLowerCase()] || null,
                            };
                        })
                    )
            )
        ];
        const initialMessage = await message.reply({
            embeds: [initEmbed],
            components: components(false),
        });

        const filter = (interaction) => interaction.user.id === message.author.id;
        
        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 30000,
        });

        collector.on('collect', (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find(x => x.directory.toLowerCase() === directory);
            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(
                    `${directory} commands`
                )
                .setDescription(`Here are the list of commands in ${emojis[directory]} **${directory}** category!`)
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    })
                );
            
            interaction.reply({ embeds: [embed], ephemeral: true })
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) })
        })
    }
}
