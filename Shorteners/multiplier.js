const client = require('../index.js');  

module.exports = multiplier = async(guild, playerId, cash) => {
  let multi = 1;
  if (client.goldRush.has(guild.id)) multi += 5;
  
  return parseInt(cash) * multi;
}
