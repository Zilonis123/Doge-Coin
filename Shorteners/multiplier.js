const client = require('../index.js');
const inventory = require('../models/inventory')

module.exports = multiplier = async(guild, userId) => {
  // define the multiplier
  let multi = 1;
  // check if the current server has a gold rush
  if (client.goldRush.has(guild.id)) multi += 5;
  // require the inventory
  const inv = await inventory.findOne({ User: userId });
  if (inv.Inventory['police car']) {
    const times = inv.Inventory['police car'];
    let val = times * 0.3;
    multi += times.toFixed(0);
  }
  if (guild.ownerId === userId) multi += 1;
  
  return multi;
}
