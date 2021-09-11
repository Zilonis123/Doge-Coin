const schema = require('../../models/wallet');
const { MessageEmbed } = require('discord.js');
const create = require('../../wallet create');
module.exports = {
    name: 'withdraw',
    description: 'withdraw your money from your bank',
    options: [
        {
            name: 'amount',
            description: 'the amount you want to withdraw!',
            required: true,
            type: 'NUMBER'
        }
    ],
    async execute(client, interaction, args) {
        const [ amount ] = args
        const lol = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577305928888360');
        const lmfao = client.guilds.cache.get('873965279665860628').emojis.cache.get('874577308927811594');
        const coin = client.guilds.cache.get('873965279665860628').emojis.cache.get('874290622201221211');

        const sch = await schema.findOne({ User: interaction.user.id });
        if (!sch) {
            return message.editReply(`You dont have money in your bank!<a:${lmfao.name}:${lmfao.id}><a:${lmfao.name}:${lmfao.id}>`);
        }
        if (!args[0]) return interaction.editReply(`I cant take out \`nothing\` out of your bank! <a:${lmfao.name}:${lmfao.id}>`);
        const input = amount;
        if (sch.Bank < input) return message.reply(`You don\'t have enough money in your bank.. <a:${lol.name}:${lol.id}>`);
        const bank = sch.Bank - input;
        sch.Bank = bank;
        sch.Wallet = sch.Wallet + input;
        sch.save();
        interaction.editReply(`Succsesfully withdrawed \`${input.toLocaleString()}\`<a:${coin.name}:${coin.id}> from your bank!`);
    }
}
