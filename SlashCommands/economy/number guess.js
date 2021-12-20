const { interactionEmbed, Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'guess',
    description: 'guess a number',
    userPermissions: [''],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute({ interaction, args, client }) {
        const coin = await global.emojis('coin');
        const lol = await global.emojis('lol');

        function random(rand) {
            const num = Math.floor(Math.random() * rand) + 1;
            return num;
        }

        const realNum = random(1000);
        const guess = random(1000);
        function replace(num) {
            let nu = '';
            const bruh = `${num}`;
            for (n of bruh) {
                nu += '#';
            }
            return nu;
        }
        interaction.followUp(`Is \`${guess}\` bigger/exact/smaller than \`${replace(realNum)}\` digit number?`);
        const filter = m => m.author.id === interaction.user.id && (m.content.toLowerCase().includes('bigger') || m.content.toLowerCase().includes('smaller') || m.content.toLowerCase().includes('exact'));
        const ans = await interaction.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] });
        if (!ans) return;

        const msg = ans.first().content.toLowerCase();
        // check the answer
        if ((msg.includes('bigger') && guess > realNum) || (msg.includes('smaller') && guess < realNum) || (msg.includes('exact') && guess === realNum)) {
            const multiplier = await global.multiplier(interaction.guild, interaction.user.id);
            const money = Math.floor(random(10000) * multiplier);
            // give the money
            client.Add(interaction.user.id, money);
            return interaction.followUp(`You got \`${money}\`${coin} (**${multiplier}x multiplier**) for guessing right!`);
        }
        else {
            return interaction.followUp(`Incorrect, the hidden number was \`${realNum}\`${lol}${lol}`);
        } 
    },
};