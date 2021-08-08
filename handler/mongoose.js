const mongooseConnectionString = process.env.MONGO;
const mongoose = require("mongoose");

module.exports = () => {
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
};
