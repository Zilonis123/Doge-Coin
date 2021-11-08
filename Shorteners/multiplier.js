const client = require('../index.js');
const inventory = require('../models/inventory')

module.exports = multiplier = async(guild, userId) => {
  // define the multiplier
  let multi = 1;
  // check if the current server has a gold rush
  if (client.goldRush.has(guild.id)) multi += 5;
  // require the inventory
  const inv = await inventory.findOne({ User: userId });
  console.log(inv['police car'])
  if (inv && inv['police car'] > 0) {
    console.log('wow')
    const times = inv['police car'];
    multi += times * 0.3;
  }
  
  return parseInt(multi);
}
