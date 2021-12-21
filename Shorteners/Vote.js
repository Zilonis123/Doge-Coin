const Topgg = require('@top-gg/sdk');

module.exports = (id) => new Promise(async ful => {
    const api = new Topgg.Api(process.env.TOPGG);
    const hasVoted = await api.hasVoted(id);
    if (hasVoted) ful(true);
    ful(false);
})