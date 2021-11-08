const client = require('../index.js');  

module.exports = multiplier = async(guild, playerId, cash) => {
  // define the multiplier
  let multi = 1;
  // check if the current server has a gold rush
  if (client.goldRush.has(guild.id)) multi += 5;
  
  return parseInt(cash) * multi, multi;
}
