var mongo = require('mongojs');

module.exports = function (config) {
	var db = mongo.connect(config.connection, ['links']);
	if (!db) {
		throw new Error('could not connect to ' + config.connection);
	}

	return db;
};
