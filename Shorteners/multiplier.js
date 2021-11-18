const client = require('../index.js');
const inventory = require('../models/inventory')

module.exports = multiplier = async(guild, userId) => {
  // define the multiplier
  let multi = 1;
  // check if the current server has a gold rush
  if (client.goldRush.has(guild.id)) multi += 10;
  // require the inventory
  const inv = await inventory.findOne({ User: userId });
  if (inv) {
    const times = inv.Inventory['police car'];
    if (times) {
        const val = times * 0.3;
        multi += val;
    }
  }
  if (guild.ownerId === userId) multi += 1;
  if (guild.id === global.config.guild) multi += 2;
  // Give subaru his multiplier
  if (userId === '449491647558975489') multi += 5;
  
  return multi;
}
