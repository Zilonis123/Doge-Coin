const client = require('../index');

client.on('message', message => {
    if (message.author.id === '873964681721679902' && message.channel.id === '893852129549234206') {
        const items = message.content.slice(' ');
        setTimeout(function() {
            // Do smth
        }, items[-1])
    }
})
