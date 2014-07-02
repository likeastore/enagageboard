var _ = require('underscore');
var config = require('../../config');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);
var period = require('../models/period');

function searches(app) {
	app.route('/api/searches').get(function (req, res, next) {
		var query = _.extend({id: 'search', report: 'period'}, period.get());

		seismo.report(query, function(err, results) {
			if (err) {
				return next(err);
			}

			res.json(results);
		});
	});
}

module.exports = searches;
