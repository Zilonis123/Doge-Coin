const client = require('../index');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if(interaction.isCommand()) {
            await interaction.deferReply().catch(() => {});

            const cmd = client.slashCommands.get(interaction.commandName);
            if(!cmd) return interaction.followUp({ content: "An error has occured" });

            const args = [];

            for (let option of interaction.options.data) {
                if(option.type === 'SUB_COMMAND') {
                    if(option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if(x.value) args.push(x.value)
                    });
                } else if(option.value) args.push(option.value)
            }
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            cmd.execute({ client, interaction, args });
        }
    }
}