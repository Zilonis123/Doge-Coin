const client = require('../index.js');

module.exports = async(emoji) => {
    // Require the guild
    const guild = await client.guilds.cache.get('873965279665860628');
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
    if (emoji.includes('loading')) 
        const emoji_loading = await guild.emojis.cache.get('876456105289580544');
        return transform(emoji_loading, 'a');
    }
    if (emoji.includes('diamond')) {
        const emoji_diamond = await guild.emojis.cache.get('915978592146563073');
        return transform(emoji_diamond, 'a')
    }
    return ':smile:';
}

const transform = (emoji, type='') => {
    const em = `<${type}:${emoji.name}:${emoji.id}>`;
    return em;
}
