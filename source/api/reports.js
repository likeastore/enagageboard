var config = require('../../config');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);

function reports(app) {
	var checkQuery = function (req, res, next) {
		if (!req.query.id || !req.query.date) {
			return next({message: 'missing query params', status: 412});
		}

		next();
	};

	app.route('/api/reports/:report').get(checkQuery, function (req, res, next) {
		var report = req.params.report;
		var id = req.query.id, date = req.query.date;

		seismo.report({id: id, report: report, date: date}, function (err, report) {
			if (err) {
				return next(err);
			}

			res.json(report);
		});
	});
}

module.exports = reports;
