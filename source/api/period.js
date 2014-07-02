var periodModel = require('../models/period');

function period(app) {
	app.route('/api/period').get(function (req, res) {
		res.json(periodModel.get());
	});
}

module.exports = period;
