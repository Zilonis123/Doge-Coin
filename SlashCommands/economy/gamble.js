const { MessageEmbed, Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'gamble',
    description: 'Double or nothing',
    userPermissions: [''],
    options: [
        {
            name: 'money',
            description: 'the amount you are going to bet',
            type: 'INTEGER',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute({ interaction, args, client }) {
        const [money] = args
        const coin = client.emojis('coin');
        const lol = client.emojis('lol');
        if (!money) return interaction.followUp(`What are you going to bet? ${lol}`);
        if (isNaN(money)) return interaction.followUp(`Did you think you can bet anything else then money? ${lol}`);

        const sch = await client.Bal(interaction.user.id);
        if (money < 1) return interaction.followUp(`You cant bet less than 1 ${coin}`)
        if (!sch || sch.Wallet < money) return interaction.followUp(`You dont have enough money in your wallet! ${lol}`);
        if (money > 1000000) return interaction.followUp('You cant bet more than one million.. because someone exploited it');

        function random() {
            const num = Math.floor(Math.random() * 4);
            return num === 1;
        }

        if (random()) {
            const win = money * 2;
            interaction.followUp(`You have won \`${win}\`${coin}!`);
            
            client.Add(interaction.user.id, win);
        }
        else {
            interaction.followUp(`Luck isnt on your side today ${lol}, you lost \`${money}\`${coin}`);
            client.Remove(interaction.user.id, money);
        }
    },
};
