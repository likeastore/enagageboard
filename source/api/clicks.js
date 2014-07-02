var _ = require('underscore');
var config = require('../../config');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);
var period = require('../models/period');

function clicks(app) {
	app.route('/api/clicks').get(function (req, res, next) {
		var query = _.extend({id: 'search-results-clicked', report: 'period'}, period.get());

		seismo.report(query, function(err, results) {
			if (err) {
				return next(err);
			}

			res.json(results);
		});
	});

	app.route('/api/clicks/queries').get(function (req, res, next) {
		var query = _.extend({id: 'search-results-clicked', report: 'period'}, period.get());

		seismo.query(query, function(err, results) {
			if (err) {
				return next(err);
			}

			results = results.map(function (event) {
				return {
					user: event.data.user,
					query: event.data.query,
					url: event.data.url,
					timestampt: event.timestampt
				};
			});

			res.json(results);
		});
	});
}

module.exports = clicks;
