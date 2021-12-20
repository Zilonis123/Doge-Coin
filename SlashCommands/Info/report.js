const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: 'report',
  description: 'report a bug of the bot',
  cooldown: 60 * 60 * 6,
  options: [
    {
      name: 'bug',
      description: 'the bug that ur reporting',
      type: 'STRING',
      required: true
    },
  ],
async execute({ client, interaction, args }) {
    const [bug] = args
    const owner = client.users.cache.get(global.config.owner);

    const reportembed = new MessageEmbed()
      .setTitle("New Report")
      .addFields(
        { name: 'Author', value: `${interaction.user.tag.toString()}`, inline: true },
        { name: 'Guild', value: `${interaction.guild.name}`, inline: true },
        { name: 'Report', value: `${bug}` },
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor(client.colors.discordRed)
      .setTimestamp();

    const reeded = interaction.user;

    interaction.followUp({ content: "Your Bug has been sent", ephemeral:true })

    const replybtn = new MessageButton()
      .setLabel('Reply')
      .setStyle('SUCCESS')
      .setCustomId('replybtn')

    const row = new MessageActionRow().addComponents([replybtn]);
    const eeew = await owner.send({ embeds: [reportembed], components: [row] });

    let filter = (m) => m.user.id === interaction.user.id
    let collector = eeew.createMessageComponentCollector({
      filter,
      type: 'BUTTON',
      time: 600000
    })

    collector.on('collect', async (button) => {
      if (button.customId === 'replybtn') {
        button.reply({ content: 'What do you want to reply with?', ephemeral: true })
        let filter = (m) => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({
          filter,
          time: 60000,
          max: 1
        })

        titleclr.on('collect', async (m) => {
          const replembed = new MessageEmbed()
            .setTitle('Report Replied!')
            .setColor('GREEN')
            .setDescription(`${owner.tag} Replied to your report\n\n**Report**: ${bug}\n\n**Reply**: ${m.content}`)
            .setFooter('Made by GamerTerros');
        titleclr.stop()

          reeded.send({ embeds: [replembed] })
          await m.reply({ content: 'Your reply has been sent', ephemeral:true })
        })
      }
    })

  }
}