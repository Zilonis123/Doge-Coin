const client = require('./index.js');

module.exports = async(emoji) => {
    // Require the guild
    const guild = await client.guilds.cache.get('873965279665860628');
    if (emoji.includes('coin')) {
        // Require coin emoji from the guild and return the emoji
        const emoji_coin = await guild.emojis.cache.get('874290622201221211');
        return transform(emoji_coin);
    }
}

const transform = (emoji, type='') => {
    const em = `<${type}:${emoji.name}:${emoji.id}>`;
    return em;
}
