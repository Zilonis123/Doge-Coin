const client = require('../index.js');
const inventory = require('../models/inventory');
const Topgg = require("@top.gg/sdk");
const api = new Topgg.Api(process.env.TOPGG);


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
  if (guild.id === global.config.guild) multi += 2;
  // Give subaru his multiplier
  if (userId === '449491647558975489') multi += 5;
  // Check if user has voted and give him a multiplier
  const hasVoted = await api.hasVoted(userId);
  if (hasVoted) multi += 1;
  
  return multi;
}
