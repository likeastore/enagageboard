var _ = require('underscore');
var config = require('../../config');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);
var period = require('../models/period');

function clicks(app) {
	app.route('/api/clicks/search/report').get(function (req, res, next) {
		report('search-results-clicked', function (err, results) {
			if (err) {
				return next(new Error(err));
			}

			res.json(results);
		});
	});

	app.route('/api/clicks/search/query').get(function (req, res, next) {
		query('search-results-clicked', function (err, results) {
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

	app.route('/api/clicks/feed/report').get(function (req, res, next) {
		report('feed-results-clicked', function (err, results) {
			if (err) {
				return next(new Error(err));
			}

			res.json(results);
		});
	});

	app.route('/api/clicks/feed/query').get(function (req, res, next) {
		query('feed-results-clicked', function (err, results) {
			if (err) {
				return next(err);
			}

			results = results.map(function (event) {
				return {
					user: event.data.user,
					url: event.data.url,
					timestampt: event.timestampt
				};
			});

			res.json(results);
		});
	});

	function report(id, callback) {
		seismo.report(_.extend({id: id, report: 'period'}, period.get()), callback);
	}

	function query(id, callback) {
		seismo.query(_.extend({id: id, report: 'period'}, period.get()), callback);
	}

}

module.exports = clicks;
