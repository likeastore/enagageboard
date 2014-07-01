var config = require('../../config');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);

function clicks(app) {
	app.route('/api/clicks').get(function (req, res, next) {
		seismo.report({id: 'search-results-clicked', report: 'day', date: 'today'}, function(err, results) {
			if (err) {
				return next(err);
			}

			res.json(results);
		});
	});

	app.route('/api/clicks/queries').get(function (req, res, next) {
		seismo.query({id: 'search-results-clicked', date: 'today'}, function(err, results) {
			if (err) {
				return next(err);
			}

			results = results.map(function (event) {
				return {
					user: event.data.user,
					query: event.data.query,
					url: event.data.url,
					data: event.timestampt
				};
			});

			res.json(results);
		});
	});
}

module.exports = clicks;
