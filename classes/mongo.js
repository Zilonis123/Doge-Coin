const mongoose = require('mongoose');
module.exports = class Mongo {
	constructor(uri) {
		this.uri = uri,
		this.login = async () =>{
			await mongoose.connect(uri, {
				useFindAndModify: false,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}).then(console.log('Connected to the database'));
		};
	}
};