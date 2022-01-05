const { MessageEmbed, Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'ask a question to it',
    userPermissions: [''],
    options: [
        {
            name: 'question',
            description: 'magic 8ball cant work without it!',
            type: 'STRING',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async execute({ interaction, args, client }) {
        const answers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
          ];

          interaction.followUp(`${answers[~~(Math.random() * answers.length)]}`)
    },
};