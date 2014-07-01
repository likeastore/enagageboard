var moment = require('moment');
var tracker = require('../db/tracker');

function clicks(app) {
	app.route('/api/clicks').get(function (req, res, next) {
		var from = req.query.from, to = req.query.to;

		if (!from || !to) {
			return res.send(412, {message: 'missing `from` or `to` query parameters'});
		}

		from = moment(from).utc().toDate();
		to = moment(to).utc().toDate();

		tracker.links.find({date: {$gte: from, $lt: to}}, function(err, clicks) {
			if (err) {
				return next(err);
			}

			res.json(clicks);
		});
	});
}

module.exports = clicks;
