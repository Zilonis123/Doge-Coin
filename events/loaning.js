const client = require('../index');
const Player = require('../models/wallet');

client.on('message', message => {
    if (message.author.id === '873964681721679902' && message.channel.id === '893852129549234206') {
        const items = message.content.slice(' ');
        client.loans.set(items[0], items[1]);
        setTimeout(async function() {
            message.delete();
            const ply = await Player.findOne({ User: items[0] });
            ply.Wallet -= items[1];
            ply.save();
            client.loans.set(items[0], null);
        }, items[-1])
    }
})
