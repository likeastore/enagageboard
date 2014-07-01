var config = require('../../config');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);

function searches(app) {
	app.route('/api/searches').get(function (req, res, next) {
		seismo.report({id: 'search', report: 'day', date: 'today'}, function(err, results) {
			console.log(err);

			if (err) {
				return next(err);
			}

			res.json(results);
		});
	});
}

module.exports = searches;
