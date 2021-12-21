const client = require('../index.js');

module.exports = async(emoji) => {
    // Require the guild
    const guild = await client.guilds.cache.get(global.config.guild);
    const guild2 = await client.guilds.cache.get("878589153258913803");
    if (emoji.includes('coin')) {
        // Require coin emoji from the guild and return the emoji
        const emoji_coin = await guild.emojis.cache.get('874290622201221211');
        // Transform the Object to a usable emoji and return
        return transform(emoji_coin, 'a');
    }
    if (emoji.includes('lol')) {
         const emoji_laughingpepe = await guild.emojis.cache.get('874577305928888360');
         return transform(emoji_laughingpepe, 'a');
    }
    if (emoji.includes('loading')) {
        const emoji_loading = await guild.emojis.cache.get('876456105289580544');
        return transform(emoji_loading, 'a');
    }
    if (emoji.includes('diamond')) {
        const emoji_diamond = await guild.emojis.cache.get('915978592146563073');
        return transform(emoji_diamond, 'a');
    }
    if (emoji.includes('bot1')) {
        console.log(guild2)
        const emoji_bot1 = await guild2.emojis.cache.get('915978592146563073');
        console.log(emoji_bot1)
        return transform(emoji_bot1);
    }
    if (emoji.includes('bot2')) {
        const emoji_bot2 = await guild2.emojis.cache.get('922816818593300512');
        return transform(emoji_bot2);
    }
    return ':smile:';
}

const transform = (emoji, type='') => {
    const em = `<${type !== '' ? `${type}:` : ''}${emoji.name}:${emoji.id}>`;
    return em;
}
